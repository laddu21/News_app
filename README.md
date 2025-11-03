# 📰 Enhanced News Blog App

A modern, feature-rich news application built with React that provides real-time news from various sources with advanced features and full responsiveness.

## ✨ Features

### 🆕 Advanced Features Added

1. **🔍 Search Functionality**
   - Real-time search across article titles and descriptions
   - Instant filtering of results

2. **📑 Bookmark System**
   - Save articles for later reading
   - Persistent storage using localStorage
   - Dedicated bookmarks page
   - Easy bookmark management (add/remove)

3. **🌓 Dark Mode**
   - Toggle between light and dark themes
   - Preference saved to localStorage
   - Smooth transitions

4. **🏛️ Telugu State News**
   - Dedicated section for Telangana news
   - Dedicated section for Andhra Pradesh news
   - Coverage of major cities (Hyderabad, Amaravati, Visakhapatnam)

5. **📂 Category Filters**
   - General, Business, Entertainment, Health, Science, Technology
   - Quick category switching
   - Visual active state indicators

6. **📄 Pagination**
   - Navigate through multiple pages of news
   - Previous/Next controls
   - Page number display

7. **🌍 Multi-Country Support**
   - World news from 8+ countries
   - Dropdown country selector
   - USA, UK, Canada, Australia, India, France, Germany, Japan

8. **📱 Fully Responsive Design**
   - Mobile-first approach
   - Tablet optimization
   - Desktop layouts
   - Hamburger menu for mobile
   - Touch-friendly interface

9. **💯 100% Width Navbar**
   - Full-width navigation bar
   - Sticky positioning
   - Gradient design
   - Responsive menu system

## 🎨 Design Features

- **Modern UI**: Clean, card-based layout with smooth animations
- **Gradient Navbar**: Beautiful purple gradient that spans full width
- **Hover Effects**: Interactive elements with visual feedback
- **Loading States**: Animated loaders for better UX
- **Responsive Images**: Optimized image loading and display
- **Overflow Handling**: Proper text wrapping and image constraints

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
  - Hamburger menu
  - Stacked layout
  - Full-width cards

- **Tablet**: 769px - 1024px
  - Optimized spacing
  - Adjusted font sizes

- **Desktop**: > 1025px
  - Full layout
  - Maximum 900px content width

## 🗂️ Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx          # Navigation with theme toggle
│   ├── Body.jsx            # Home page with search & categories
│   ├── TeluguNews.jsx      # Telugu state news section
│   ├── World.jsx           # International news
│   ├── Tech.jsx            # Technology news
│   ├── Sports.jsx          # Sports news
│   └── Bookmarks.jsx       # Saved articles
├── App.js                  # Main app with routing & dark mode
├── App.css                 # Comprehensive styles
└── index.js                # Entry point
```

## 🎯 Usage

### Navigation
- Click on menu items to navigate between sections
- Use the theme toggle (🌙/☀️) to switch between dark and light modes

### Searching
- Type in the search bar on the home page
- Results filter automatically as you type

### Bookmarking
- Click the 📑 icon on any article to bookmark it
- Click 🔖 to remove from bookmarks
- View all bookmarks in the Bookmarks section

### Categories
- Click category pills to filter news by topic
- Pagination controls appear at the bottom

### Telugu News
- Switch between Telangana and Andhra Pradesh tabs
- Get localized news from these states

## 🛠️ Technologies Used

- **React 19** - UI framework
- **React Router DOM** - Navigation
- **Axios** - API requests
- **NewsAPI** - News data source
- **CSS3** - Styling with animations
- **LocalStorage** - Data persistence

## 🌟 Key Improvements

1. ✅ **100% Width Navbar** - Now spans the entire screen width
2. ✅ **Telugu State News** - New dedicated section for regional news
3. ✅ **Advanced Features** - Search, bookmarks, dark mode, pagination
4. ✅ **Fully Responsive** - Works perfectly on all device sizes
5. ✅ **Overflow Handling** - All sections properly constrained with smooth scrolling where needed
6. ✅ **Modern Design** - Updated UI with gradients, shadows, and animations

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ using React
