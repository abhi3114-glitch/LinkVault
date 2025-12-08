import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Built-in in Node 18+, but safe to use global fetch
// If Node < 18, we might need node-fetch. Assuming Node 18+ for modern env.
// User has 'Node.js optional for link checking'. 
// I'll stick to standard fetch.

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/check', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        const response = await fetch(url, {
            method: 'HEAD',
            timeout: 5000 // 5s timeout
        });

        // Some servers reject HEAD, try GET if HEAD fails with 405 (Method Not Allowed)
        if (response.status === 405) {
            const responseGet = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
            return res.json({
                status: responseGet.ok ? 'active' : 'dead',
                statusCode: responseGet.status
            });
        }

        res.json({
            status: response.ok ? 'active' : 'dead',
            statusCode: response.status
        });

    } catch (error) {
        // If DNS error or timeout -> dead
        res.json({ status: 'dead', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`LinkVault Proxy running on http://localhost:${PORT}`);
});
