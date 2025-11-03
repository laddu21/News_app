/**
 * Bookmarks Component
 * 
 * Displays all bookmarked articles saved by the user:
 * - Reads bookmarks from localStorage
 * - Real-time updates when bookmarks are added/removed from other pages
 * - Remove individual bookmarks functionality
 * - Clear all bookmarks option with confirmation
 * - Responsive design for all devices
 * 
 * Data Source: localStorage (no API calls)
 * Event Listening: Listens for 'bookmarkUpdate' events from other components
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
    const navigate = useNavigate();
    // State management
    const [bookmarks, setBookmarks] = useState([]); // Array of bookmarked articles

    // Effect: Load bookmarks on mount and set up event listener
    useEffect(() => {
        // Initial load of bookmarks
        loadBookmarks();

        /**
         * Event handler for bookmark updates
         * Reloads bookmarks when any component dispatches 'bookmarkUpdate' event
         */
        const handleUpdate = () => {
            loadBookmarks();
        };

        // Add event listener for real-time updates
        window.addEventListener('bookmarkUpdate', handleUpdate);

        // Cleanup: Remove event listener when component unmounts
        return () => window.removeEventListener('bookmarkUpdate', handleUpdate);
    }, []);

    /**
     * Load bookmarks from localStorage
     * Parses JSON string to array of bookmark objects
     */
    const loadBookmarks = () => {
        const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setBookmarks(saved);
    };

    /**
     * Remove a single bookmark by URL
     * Updates both state and localStorage
     * Dispatches event to notify other components
     * @param {string} url - URL of the article to remove from bookmarks
     */
    const removeBookmark = (url) => {
        const updated = bookmarks.filter(b => b.url !== url);
        localStorage.setItem('bookmarks', JSON.stringify(updated));
        setBookmarks(updated);
        // Notify other components (like Body, Sports, etc.)
        window.dispatchEvent(new Event('bookmarkUpdate'));
        window.dispatchEvent(new CustomEvent('toast', { detail: 'removed from book mark' }));
    };

    /**
     * Clear all bookmarks
     * Shows confirmation dialog before clearing
     * Updates both state and localStorage
     * Dispatches event to notify other components
     */
    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all bookmarks?')) {
            localStorage.setItem('bookmarks', JSON.stringify([]));
            setBookmarks([]);
            // Notify other components
            window.dispatchEvent(new Event('bookmarkUpdate'));
            window.dispatchEvent(new CustomEvent('toast', { detail: 'removed from book mark' }));
        }
    };

    return (
        <div className="body-container">
            {/* Header with Title and Clear All Button */}
            <div className="bookmarks-header">
                <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">← Back</button>
                <h1 className="page-title">🔖 Bookmarked Articles</h1>
                {/* Only show Clear All button if there are bookmarks */}
                {bookmarks.length > 0 && (
                    <button onClick={clearAll} className="clear-all-btn">
                        Clear All
                    </button>
                )}
            </div>

            {/* Empty State - No Bookmarks */}
            {bookmarks.length === 0 ? (
                <div className="no-results">
                    <p>No bookmarks yet!</p>
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>
                        Bookmark articles to read them later
                    </p>
                </div>
            ) : (
                /* Display All Bookmarked Articles */
                bookmarks.map((post, idx) => (
                    <div className="blog-post" key={idx}>
                        {/* Article Header with Title and Remove Bookmark Button */}
                        <div className="post-header">
                            <h2>{post.title}</h2>
                            <button
                                className="bookmark-btn bookmarked"
                                onClick={() => removeBookmark(post.url)}
                                aria-label="Remove bookmark"
                            >
                                🔖
                            </button>
                        </div>

                        {/* Article Metadata (Author and Date) */}
                        <div className="meta">
                            <span>By {post.author || "Unknown"}</span> | <span>{post.publishedAt?.slice(0, 10)}</span>
                        </div>

                        {/* Article Description */}
                        <p>{post.description}</p>

                        {/* Article Image (if available) */}
                        {post.urlToImage && (
                            <img src={post.urlToImage} alt="news" className="post-image" />
                        )}

                        {/* Read More Link */}
                        <div>
                            <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-more">
                                Read more →
                            </a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Bookmarks;
