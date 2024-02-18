import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  const handleGithubClick = () => {
    // Ανακατεύθυνση στο αντίστοιχο Git repository
    window.location.href = 'https://github.com/ntua/softeng23-43.git';
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Ntuaflix</p>
        <a href="https://github.com/ntua/softeng23-43.git" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} onClick={handleGithubClick} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
