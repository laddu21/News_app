/**
 * Main App Component
 * 
 * This is the root component of the News Blog application.
 * It handles routing, dark mode functionality, and renders all pages.
 * 
 * Features:
 * - Dark mode toggle with localStorage persistence
 * - Client-side routing using React Router
 * - Multiple news sections (Home, Telugu News, World, Tech, Sports, Bookmarks)
 */

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import Sports from "./Components/Sports";
import TeluguNews from "./Components/TeluguNews";
import World from "./Components/World";
import Tech from "./Components/Tech";
import Bookmarks from "./Components/Bookmarks";
import './App.css';

const App = () => {
  // State to manage dark mode theme
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Effect: Load saved theme preference on component mount
   * Retrieves dark mode setting from localStorage and applies it to the body element
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  /**
   * Toggle dark mode theme
   * Updates state, localStorage, and applies/removes dark-mode class to body
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      {/* Navigation bar with dark mode toggle */}
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Application routes */}
      <Routes>
        <Route path="/" element={<Body />} /> {/* Home page with search and categories */}
        <Route path="/telugu-news" element={<TeluguNews />} /> {/* Telugu state news */}
        <Route path="/world" element={<World />} /> {/* International news */}
        <Route path="/tech" element={<Tech />} /> {/* Technology news */}
        <Route path="/sports" element={<Sports />} /> {/* Sports news */}
        <Route path="/bookmarks" element={<Bookmarks />} /> {/* Saved articles */}
      </Routes>
    </div>
  );
}

export default App;



