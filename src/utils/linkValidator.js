export const checkUrl = async (url) => {
    // 1. Try Direct Fetch (HEAD)
    // fast and works for CORS-friendly sites or same-origin
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        // We can't easily detect 404 with no-cors. 
        // And standard cors request checks fail on almost all major sites.
        // So for reliable checks, we MUST rely on the proxy if we want to detect 404s.
        // However, if the user doesn't run the proxy, we can try 'no-cors'.
        // 'no-cors' success (opaque) = "Server Reached" (Active).
        // 'no-cors' fail (network error) = "Server Unreachable" (Dead).
        // This is "good enough" for basic availability, but fails to catch "404 Not Found" (which returns opaque).
        // 
        // Strategy:
        // Try Proxy FIRST if available. It's the most accurate.
        // Fallback to fetch 'no-cors' if proxy fails.

        // Check Proxy validity (optimistic)
        try {
            const proxyRes = await fetch(`http://localhost:3001/check?url=${encodeURIComponent(url)}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (proxyRes.ok) {
                const data = await proxyRes.json();
                return data.status; // 'active' or 'dead'
            }
        } catch (proxyErr) {
            // Proxy not running or unreachable
            clearTimeout(timeoutId);
        }

        // Fallback: Direct Fetch (no-cors)
        // Only tells us if the domain resolves and accepts connection.
        // Does NOT tell us if 404.
        const fallbackController = new AbortController();
        const fallbackTimeout = setTimeout(() => fallbackController.abort(), 5000);

        const directRes = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: fallbackController.signal
        });
        clearTimeout(fallbackTimeout);

        // If we get here, it didn't throw network error.
        // NOTE: no-cors opaque response type is 'opaque'.
        // We treat this as 'active' (best guess).
        return 'active';

    } catch (error) {
        // Network error (DNS, Connection Refused, Timeout)
        return 'dead';
    }
};
