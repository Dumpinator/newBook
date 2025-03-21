import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);
  
  return (
    <div className={`portfolio-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="sidebar bg-red-400">
        <div className="logo-section">
          <h1>Jonathan de BOISVILLIERS</h1>
          <p>Developer Fullstack JavaScript</p>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#info">Info</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#copycat">Copycat</a></li>
          </ul>
        </nav>
        
        <div className="copyright">
          © Keita Yamada
        </div>
      </div>
      
      <div className="main-content bg-blue-400">
        <div className="project-item">
          <div className="project-title">
            <h2>Shogo</h2>
            <h2>Tominaga</h2>
          </div>
          <p className="project-date">Mar 2025 / Dev / Design: Hiroki Nakano</p>
        </div>
        
        <div className="project-item">
          <div className="project-title">
            <h2>LQVE</h2>
          </div>
          <p className="project-date">Mar 2025 / Dev / Design: Hiroki Nakano</p>
        </div>
        
        <div className="project-item">
          <div className="project-title">
            <h2>PRODUCTION</h2>
            <h2>HASU</h2>
          </div>
          <p className="project-date">Oct 2024 / Design & Dev</p>
        </div>
        
        <div className="project-item">
          <div className="project-title">
            <h2>emuni</h2>
          </div>
          <p className="project-date">Jul 2024 / Dev / Design: Hiroki Nakano</p>
        </div>
        
        <div className="project-item">
          <div className="project-title">
            <h2>UNDER</h2>
            <h2>VOYAGER</h2>
          </div>
          <p className="project-date">Apr 2024 / Design & Dev</p>
        </div>
      </div>
      
      <div className="mode-toggle">
        <button 
          className={`dark-mode ${darkMode ? 'active' : ''}`}
          onClick={() => setDarkMode(true)}
        >
          DARK
        </button>
        <button 
          className={`light-mode ${!darkMode ? 'active' : ''}`}
          onClick={() => setDarkMode(false)}
        >
          LIGHT
        </button>
      </div>
    </div>
  )
}

export default App