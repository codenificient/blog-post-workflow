/**
 * Tiny demo server for the Blog Post Workflow GitHub Action.
 *
 * Serves a static landing page at /, plus two API routes the page uses:
 *   GET /api/health           — liveness probe (Coolify, Docker)
 *   GET /api/preview?host=…   — fetches public posts from a Hashnode
 *                               publication and renders the same markdown
 *                               snippet the GitHub Action would write into
 *                               your README.
 *
 * The Action itself still works exactly as before — this server is only
 * here so the project has somewhere to point a domain at.
 */
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || process.env.port || 9000;
const HASHNODE_KEY = process.env.HASHNODE_API_KEY || process.env.NEXT_PUBLIC_HASHNODE_KEY;

app.use(express.static('public'));

app.get('/api/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

const PUBLICATION_QUERY = `
	query PublicationPosts($host: String!, $first: Int!) {
		publication(host: $host) {
			id
			title
			displayTitle
			url
			posts(first: $first) {
				edges {
					node {
						title
						slug
						url
						brief
						publishedAt
						readTimeInMinutes
						tags { name }
						coverImage { url }
					}
				}
			}
		}
	}
`;

function escapeMarkdown(text) {
	if (!text) return '';
	return String(text).replace(/[\\`*_{}\[\]()#+\-.!|<>]/g, (c) => '\\' + c);
}

/** Render the same `* [title](url)` list the Action emits. */
function renderMarkdown(posts) {
	return posts
		.map((p) => `* [${escapeMarkdown(p.title)}](${p.url})`)
		.join('\n');
}

app.get('/api/preview', async (req, res) => {
	const host = String(req.query.host || '').trim();
	const max = Math.min(Math.max(Number(req.query.max) || 5, 1), 20);

	if (!host) {
		return res.status(400).json({ error: 'host query param is required (e.g., blog.tioye.dev)' });
	}

	try {
		const headers = { 'Content-Type': 'application/json' };
		// Public publication posts work without auth, but if a key is present
		// we pass it through (some Hashnode rate-limit windows are friendlier).
		if (HASHNODE_KEY) headers.Authorization = HASHNODE_KEY;

		const upstream = await fetch('https://gql.hashnode.com', {
			method: 'POST',
			headers,
			body: JSON.stringify({ query: PUBLICATION_QUERY, variables: { host, first: max } }),
		});

		if (!upstream.ok) {
			const text = await upstream.text();
			return res.status(502).json({ error: `Hashnode upstream ${upstream.status}: ${text.slice(0, 200)}` });
		}

		const body = await upstream.json();
		if (body.errors && body.errors.length) {
			return res.status(502).json({ error: body.errors.map((e) => e.message).join('; ') });
		}

		const pub = body.data && body.data.publication;
		if (!pub) {
			return res.status(404).json({ error: `No Hashnode publication found for host '${host}'` });
		}

		const posts = (pub.posts && pub.posts.edges ? pub.posts.edges : [])
			.map((e) => e.node)
			.slice(0, max);

		res.json({
			publication: {
				id: pub.id,
				title: pub.displayTitle || pub.title,
				url: pub.url,
			},
			posts,
			markdown: renderMarkdown(posts),
		});
	} catch (err) {
		res.status(500).json({ error: err && err.message ? err.message : String(err) });
	}
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`blog-post-workflow demo server on :${PORT}`);
});
