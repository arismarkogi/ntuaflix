/*
import React from "react";
import { Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box sx={{ py: 4, textAlign: "center", bgcolor: "#424242" }}>
      <IconButton
        aria-label="github"
        href="https://github.com/ChristosHadjichristofi/SaaS-FrontEnd-Demo"
        target="_blank"
        rel="noopener"
        sx={{ color: "white", mr: 2 }}
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        aria-label="next.js"
        href="https://nextjs.org/docs/api-reference/create-next-app"
        target="_blank"
        rel="noopener"
        sx={{ color: "white", bgcolor: "#424242" }}
      >
        <img src={"https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js.png"} alt="Next.js icon" style={{ filter: "invert(1) brightness(500%)", maxWidth: "200px", maxHeight: "auto" }} />
      </IconButton>
      <IconButton
        aria-label="fake store"
        href="https://fakestoreapi.com/"
        target="_blank"
        rel="noopener"
        sx={{ color: "white", bgcolor: "#424242" }}
      >
        <img src={"https://fakestoreapi.com/icons/logo.png"} alt="FakeStore icon" style={{ maxWidth: "25px", maxHeight: "auto" }} />
      </IconButton>
    </Box>
  );
};

export default Footer;
*/
// Footer.js

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  const handleGithubClick = () => {
    // Ανακατεύθυνση στο αντίστοιχο Git repository
    window.location.href = 'https://github.com/your-github-repo';
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Your App Name</p>
        <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} onClick={handleGithubClick} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

