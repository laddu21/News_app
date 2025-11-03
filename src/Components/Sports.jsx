// Sports News Component - Displays sports articles with load more functionality
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const Sports = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchSports = async (pageNum = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: 'us',
                    category: 'sports',
                    pageSize,
                    page: pageNum,
                    apiKey: API_KEY,
                },
            });

            if (res.data.status !== 'ok') {
                throw new Error(res.data.message || 'API error');
            }

            setArticles(prev => pageNum === 1 ? res.data.articles : [...prev, ...res.data.articles]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSports(page);
    }, [page]);

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
            <h1 className="page-title">🏆 Sports News</h1>
            {loading && <div className="loader">Loading sports news…</div>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

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

            {!loading && !error && articles.length >= pageSize && (
                <button onClick={() => setPage(prev => prev + 1)} className="load-more-btn">
                    Load More
                </button>
            )}
        </div>
    );
};

export default Sports;
