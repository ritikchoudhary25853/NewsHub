 import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1>About NewzHub</h1>
      <p className="lead">
        NewsHub is a modern news aggregator that brings you the latest top headlines from around the world, in real-time.
        Powered by the GNews API, we strive to deliver accurate, fast, and relevant news across multiple categories.
      </p>
      
      <h4>Key Features:</h4>
      <ul>
        <li>📰 Top headlines from reliable global sources</li>
        <li>🌍 Coverage across multiple countries and categories</li>
        <li>⚡ Lightning-fast updates with clean user experience</li>
        <li>📱 Mobile-friendly and responsive design</li>
      </ul>

      <h4>Our Mission</h4>
      <p>
        Our mission is to empower readers with timely and trustworthy news. We believe in transparency, simplicity, and access to information for everyone.
      </p>

      <h4>Technologies Used</h4>
      <p>
        React, Bootstrap, GNews API, and modern web standards.
      </p>

      <p className="text-muted mt-4">Version 1.0.0 | Built by Ritik</p>
    </div>
  );
};

export default About;
