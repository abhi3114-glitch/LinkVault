import { Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import classes from './BookmarkCard.module.css';
import { clsx } from 'clsx';

export const BookmarkCard = ({ bookmark, onRemove, onCheck }) => {
    const statusColors = {
        active: 'var(--primary)',
        dead: 'var(--danger)',
        pending: 'var(--warning)',
        unknown: 'var(--muted)'
    };

    const statusLabel = {
        active: 'Active',
        dead: 'Dead',
        pending: 'Pending',
        unknown: 'Unknown'
    };

    return (
        <div className={classes.card} style={{ borderColor: statusColors[bookmark.status] || 'var(--border)' }}>
            <div className={classes.header}>
                <div className={classes.status} style={{ color: statusColors[bookmark.status] || 'var(--muted)' }}>
                    <span className={classes.dot} style={{ background: statusColors[bookmark.status] || 'var(--muted)' }}></span>
                    {statusLabel[bookmark.status] || 'Unknown'}
                </div>
                <div className={classes.actions}>
                    {/* Manual refresh button for single item could be here, but we check all usually */}
                    <button onClick={() => onRemove(bookmark.id)} className={classes.iconBtn} title="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className={classes.body}>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
                    <h3 className={classes.title}>{bookmark.url}</h3>
                    <ExternalLink size={14} className={classes.linkIcon} />
                </a>

                <div className={classes.tags}>
                    {bookmark.tags.map(tag => (
                        <span key={tag} className={classes.tag}>#{tag}</span>
                    ))}
                </div>
            </div>

            <div className={classes.footer}>
                <span>Checked {bookmark.lastChecked ? formatDistanceToNow(bookmark.lastChecked) + ' ago' : 'Never'}</span>
            </div>
        </div>
    );
};
