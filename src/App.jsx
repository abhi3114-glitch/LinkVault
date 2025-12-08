import { useState, useMemo } from 'react';
import { useBookmarks } from './hooks/useBookmarks';
import { useLinkChecker } from './hooks/useLinkChecker';
import { BookmarkForm } from './components/BookmarkForm';
import { BookmarkList } from './components/BookmarkList';
import { RefreshCw, Download } from 'lucide-react';
import classes from './App.module.css';

function App() {
  const { bookmarks, addBookmark, removeBookmark, updateBookmark } = useBookmarks();
  const { checkAll, checking } = useLinkChecker(bookmarks, updateBookmark);

  const stats = useMemo(() => {
    const total = bookmarks.length;
    const active = bookmarks.filter(b => b.status === 'active').length;
    const dead = bookmarks.filter(b => b.status === 'dead').length;
    return { total, active, dead };
  }, [bookmarks]);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "linkvault_bookmarks.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.titleSection}>
          <h1>LinkVault</h1>
          <p className={classes.subtitle}>Smart Bookmark Manager</p>
        </div>

        <div className={classes.actions}>
          <div className={classes.statsBar}>
            <div className={classes.statItem}>
              <span className={classes.statValue}>{stats.total}</span>
              <span className={classes.statLabel}>Total</span>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.statItem} style={{ color: 'var(--primary)' }}>
              <span className={classes.statValue}>{stats.active}</span>
              <span className={classes.statLabel}>Active</span>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.statItem} style={{ color: 'var(--danger)' }}>
              <span className={classes.statValue}>{stats.dead}</span>
              <span className={classes.statLabel}>Dead</span>
            </div>
          </div>

          <div className={classes.btnGroup}>
            <button
              onClick={checkAll}
              disabled={checking}
              className={`${classes.actionBtn} ${classes.checkBtn}`}
              title="Run Link Checker"
            >
              <RefreshCw size={18} className={checking ? 'spin' : ''} />
              {checking ? 'Checking...' : 'Check Status'}
            </button>

            <button
              onClick={handleExport}
              className={classes.actionBtn}
              title="Export JSON"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </header>

      <main className={classes.section}>
        <BookmarkForm onAdd={addBookmark} />

        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Collection</h2>
        </div>

        <BookmarkList bookmarks={bookmarks} onRemove={removeBookmark} />
      </main>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
