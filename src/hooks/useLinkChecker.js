import { useState, useCallback } from 'react';
import { checkUrl } from '../utils/linkValidator';

export const useLinkChecker = (bookmarks, updateBookmark) => {
    const [checking, setChecking] = useState(false);

    const checkAll = useCallback(async () => {
        if (checking) return;
        setChecking(true);

        const now = Date.now();

        // Process in batches to avoid overwhelming browser/network
        // Limit concurrency to 5
        const batchSize = 5;
        const queue = [...bookmarks];

        // Helper for processing
        const processItem = async (bookmark) => {
            const status = await checkUrl(bookmark.url);
            updateBookmark(bookmark.id, {
                status,
                lastChecked: Date.now()
            });
        };

        while (queue.length > 0) {
            const batch = queue.splice(0, batchSize);
            await Promise.all(batch.map(processItem));
        }

        setChecking(false);
    }, [bookmarks, checking, updateBookmark]);

    return { checkAll, checking };
};
