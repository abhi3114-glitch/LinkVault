import { useState } from 'react';
import { Plus } from 'lucide-react';
import classes from './BookmarkForm.module.css';

export const BookmarkForm = ({ onAdd }) => {
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        // Split tags by comma or space
        const tagList = tags.split(/[\s,]+/).filter(tag => tag.trim());

        onAdd(url, tagList);
        setUrl('');
        setTags('');
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.inputGroup}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    className={classes.input}
                />
            </div>
            <div className={classes.inputGroup}>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (dev, news, read-later)"
                    className={classes.input}
                />
            </div>
            <button type="submit" className={classes.button}>
                <Plus size={20} />
                <span>Add</span>
            </button>
        </form>
    );
};
