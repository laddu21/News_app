// Telugu State News Component - Shows news for Telangana and Andhra Pradesh
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const TeluguNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeState, setActiveState] = useState('telangana');

    const fetchTeluguNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const searchQuery = activeState === 'telangana'
                ? 'Telangana OR Hyderabad'
                : 'Andhra Pradesh OR Amaravati OR Visakhapatnam';

            // Use Vercel serverless function proxy
            const res = await axios.get('/api/news', {
                params: {
                    endpoint: 'everything',
                    q: searchQuery,
                    language: 'en',
                    sortBy: 'publishedAt',
                    pageSize: 20
                }
            });

            if (res.data.status !== 'ok') {
                throw new Error(res.data.message || 'API error');
            }

            setArticles(res.data.articles || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [activeState]);

    useEffect(() => {
        fetchTeluguNews();
    }, [fetchTeluguNews]);

    const toggleBookmark = (post) => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const isBookmarked = bookmarks.some(b => b.url === post.url);

        if (isBookmarked) {
            const updated = bookmarks.filter(b => b.url !== post.url);
            localStorage.setItem('bookmarks', JSON.stringify(updated));
        } else {
            bookmarks.push(post);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        window.dispatchEvent(new Event('bookmarkUpdate'));
    };

    const isBookmarked = (post) => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        return bookmarks.some(b => b.url === post.url);
    };

    return (
        <div className="body-container">
            <h1 className="page-title">🏛️ Telugu State News</h1>

            <div className="state-selector">
                <button
                    className={`state-btn ${activeState === 'telangana' ? 'active' : ''}`}
                    onClick={() => setActiveState('telangana')}
                >
                    Telangana
                </button>
                <button
                    className={`state-btn ${activeState === 'andhra' ? 'active' : ''}`}
                    onClick={() => setActiveState('andhra')}
                >
                    Andhra Pradesh
                </button>
            </div>

            {loading && <div className="loader">Loading Telugu news…</div>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!loading && !error && articles.length === 0 && (
                <div className="no-results">No articles found</div>
            )}

            {!loading && !error && articles.map((post, idx) => (
                <div className="blog-post" key={idx}>
                    <div className="post-header">
                        <h2>{post.title}</h2>
                        <button
                            className={`bookmark-btn ${isBookmarked(post) ? 'bookmarked' : ''}`}
                            onClick={() => toggleBookmark(post)}
                            aria-label="Bookmark"
                        >
                            {isBookmarked(post) ? '🔖' : '📑'}
                        </button>
                    </div>
                    <div className="meta">
                        <span>By {post.author || "Unknown"}</span> | <span>{post.publishedAt?.slice(0, 10)}</span>
                        {post.source?.name && <span> | {post.source.name}</span>}
                    </div>
                    <p>{post.description}</p>
                    {post.urlToImage && (
                        <img src={post.urlToImage} alt="news" className="post-image" />
                    )}
                    <div>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-more">
                            Read more →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeluguNews;
