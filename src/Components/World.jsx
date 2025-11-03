// World News Component - International news from multiple countries
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const World = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('us');

    const countries = [
        { code: 'us', name: 'USA' },
        { code: 'gb', name: 'UK' },
        { code: 'ca', name: 'Canada' },
        { code: 'au', name: 'Australia' },
        { code: 'in', name: 'India' },
        { code: 'fr', name: 'France' },
        { code: 'de', name: 'Germany' },
        { code: 'jp', name: 'Japan' },
    ];

    const fetchWorldNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Use Vercel serverless function proxy
            const res = await axios.get('/api/news', {
                params: {
                    endpoint: 'top-headlines',
                    country: selectedCountry,
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
    }, [selectedCountry]);

    useEffect(() => {
        fetchWorldNews();
    }, [fetchWorldNews]);

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
            <h1 className="page-title">🌍 World News</h1>

            <div className="country-selector">
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="country-select"
                >
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <div className="loader">Loading world news…</div>}
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
        </div>
    );
};

export default World;
