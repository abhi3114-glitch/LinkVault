import { useState, useMemo } from 'react';
import { BookmarkCard } from './BookmarkCard';
import classes from './BookmarkList.module.css';
import { Search } from 'lucide-react';

export const BookmarkList = ({ bookmarks, onRemove }) => {
    const [filter, setFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set();
        bookmarks.forEach(b => b.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [bookmarks]);

    const filtered = useMemo(() => {
        return bookmarks.filter(b => {
            const matchesUrl = b.url.toLowerCase().includes(filter.toLowerCase());
            const matchesTag = tagFilter ? b.tags.includes(tagFilter) : true;
            return matchesUrl && matchesTag;
        });
    }, [bookmarks, filter, tagFilter]);

    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <div className={classes.search}>
                    <Search size={18} className={classes.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={classes.searchInput}
                    />
                </div>

                <div className={classes.tags}>
                    <button
                        className={`${classes.tagBtn} ${!tagFilter ? classes.activeTag : ''}`}
                        onClick={() => setTagFilter('')}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`${classes.tagBtn} ${tagFilter === tag ? classes.activeTag : ''}`}
                            onClick={() => setTagFilter(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className={classes.grid}>
                {filtered.map(bookmark => (
                    <BookmarkCard
                        key={bookmark.id}
                        bookmark={bookmark}
                        onRemove={onRemove}
                    />
                ))}
                {filtered.length === 0 && (
                    <div className={classes.empty}>
                        <p>No bookmarks found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
