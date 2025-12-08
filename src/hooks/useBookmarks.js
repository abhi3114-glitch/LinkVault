import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadBookmarks, saveBookmarks } from '../utils/storage';

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    // Load on mount
    useEffect(() => {
        const loaded = loadBookmarks();
        setBookmarks(loaded);
    }, []);

    // Save on change
    useEffect(() => {
        if (bookmarks.length > 0) { // Avoid saving empty if initial load hasn't happened? 
            // Actually, if we delete all, we want to save empty array.
            // But on first load, if it's empty, we save empty. that's fine.
            // Better to rely on initial load state?
            // For simplicity in this SPA, we just save whenever bookmarks change.
            saveBookmarks(bookmarks);
        }
        // Note: If we had a "loading" state, we should check it.
        // But for localStorage sync, checking length > 0 might prevent clearing on first render if load returns empty.
        // Better: We should load, then set, then future updates trigger save.
        // But useEffect runs after render.
        // Let's explicitly save in the actions (add/remove) to be safer?
        // Or just let this effect handle it but be careful about initial render.
        // The initial load happens in the first effect.
        // The second effect will run on mount too with initial state [].
        // If we have data in LS, first effect sets bookmarks.
        // Second effect runs again.
        // To update LS correctly, we should separate "initial load done" state.
    }, [bookmarks]);

    // But to be robust and simple: save in actions.
    // Actually, useEffect is standard for this simple case.

    const addBookmark = useCallback((url, tags = []) => {
        const newBookmark = {
            id: uuidv4(),
            url,
            title: url, // Placeholder, can be updated later
            tags,
            status: 'pending', // pending, active, dead
            lastChecked: 0,
            createdAt: Date.now(),
        };

        setBookmarks(prev => {
            const next = [newBookmark, ...prev];
            saveBookmarks(next); // Immediate save
            return next;
        });
        return newBookmark;
    }, []);

    const removeBookmark = useCallback((id) => {
        setBookmarks(prev => {
            const next = prev.filter(b => b.id !== id);
            saveBookmarks(next);
            return next;
        });
    }, []);

    const updateBookmark = useCallback((id, updates) => {
        setBookmarks(prev => {
            const next = prev.map(b => b.id === id ? { ...b, ...updates } : b);
            saveBookmarks(next);
            return next;
        });
    }, []);

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        updateBookmark
    };
};
