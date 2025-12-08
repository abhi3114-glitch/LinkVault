export const STORAGE_KEY = 'linkvault_data';

export const loadBookmarks = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load bookmarks:', error);
        return [];
    }
};

export const saveBookmarks = (bookmarks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Failed to save bookmarks:', error);
    }
};
