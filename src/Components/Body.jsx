/**
 * Body Component (Home Page)
 * 
 * Main landing page displaying news articles with advanced features:
 * - Real-time search across article titles and descriptions
 * - Category filtering (6 categories: general, business, entertainment, health, science, technology)
 * - Pagination for browsing through multiple pages
 * - Bookmark functionality to save articles for later
 * - Responsive design adapting to all screen sizes
 * 
 * Data Source: NewsAPI - US top headlines
 */

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// NewsAPI key from environment variables
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const Body = () => {
    // State management
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('general');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 10;

    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'technology'];

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(+"https://newsapi.org/v2/top-headlines"+, {
                params: {
                    country: 'us',
                    category: category,
                    pageSize: pageSize,
                    page: page,
                    apiKey: API_KEY
                }
            });
            setPosts(res.data.articles || []);
            setTotalResults(res.data.totalResults || 0);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    }, [category, page]);

    const handleSearch = useCallback(() => {
        if (!searchTerm.trim()) {
            setFilteredPosts(posts);
            return;
        }
        const filtered = posts.filter(post =>
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

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

    if (loading) return <div className='body-container'><div className='loader'>Loading...</div></div>;

    const displayPosts = filteredPosts.length > 0 || searchTerm ? filteredPosts : posts;

    return (
        <div className='body-container'>
            <div className='controls'>
                <input
                    type='text'
                    placeholder=' Search news...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-input'
                />
                
                <div className='category-pills'>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={+"category-pill "+}
                            onClick={() => {
                                setCategory(cat);
                                setPage(1);
                            }}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {displayPosts.length === 0 ? (
                <div className='no-results'>No articles found</div>
            ) : (
                <>
                    {displayPosts.map((post, idx) => (
                        <div className='blog-post' key={idx}>
                            <div className='post-header'>
                                <h2>{post.title}</h2>
                                <button
                                    className={+"ookmark-btn "+}
                                    onClick={() => toggleBookmark(post)}
                                    aria-label='Bookmark'
                                >
                                    {isBookmarked(post) ? '' : ''}
                                </button>
                            </div>
                            
                            <div className='meta'>
                                <span>By {post.author || 'Unknown'}</span> | <span>{post.publishedAt?.slice(0, 10)}</span>
                            </div>
                            
                            <p>{post.description}</p>
                            
                            {post.urlToImage && (
                                <img src={post.urlToImage} alt='news' className='post-image' />
                            )}
                            
                            <div>
                                <a href={post.url} target='_blank' rel='noopener noreferrer' className='read-more'>
                                    Read more 
                                </a>
                            </div>
                        </div>
                    ))}

                    <div className='pagination'>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className='pagination-btn'
                        >
                             Previous
                        </button>
                        <span className='page-info'>Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * pageSize >= totalResults}
                            className='pagination-btn'
                        >
                            Next 
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Body;
