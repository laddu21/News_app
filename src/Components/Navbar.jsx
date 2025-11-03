/**
 * Navbar Component
 * 
 * Responsive navigation bar with the following features:
 * - Full-width design spanning the entire screen
 * - Links to all sections of the app
 * - Dark mode toggle button
 * - Hamburger menu for mobile devices
 * - Sticky positioning for easy access while scrolling
 * 
 * Props:
 * @param {Function} toggleDarkMode - Function to toggle dark/light theme
 * @param {boolean} darkMode - Current theme state
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, darkMode }) => {
    // State to manage mobile menu open/closed state
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav">
            <div className="nav-content">
                {/* Mobile menu icon - left on mobile */}
                <div className="menuIcon" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Title / Brand - right on mobile */}
                <div className="logo">📰 NewsBlog</div>

                {/* Navigation menu - toggles open on mobile */}
                <div className={`menu${open ? ' open' : ''}`}>
                    <Link to="/" onClick={() => setOpen(false)}>
                        Home
                    </Link>
                    <Link to="/telugu-news" onClick={() => setOpen(false)}>
                        Telugu News
                    </Link>
                    <Link to="/world" onClick={() => setOpen(false)}>
                        World
                    </Link>
                    <Link to="/tech" onClick={() => setOpen(false)}>
                        Tech
                    </Link>
                    <Link to="/sports" onClick={() => setOpen(false)}>
                        Sports
                    </Link>
                    <Link to="/bookmarks" onClick={() => setOpen(false)}>
                        Bookmarks
                    </Link>

                    {/* Theme toggle inside menu for mobile */}
                    <button
                        className="theme-toggle theme-toggle-menu"
                        onClick={() => { toggleDarkMode(); setOpen(false); }}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>

                {/* Desktop-only theme toggle on the navbar */}
                <div className="nav-actions">
                    <button
                        className="theme-toggle theme-toggle-desktop"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
