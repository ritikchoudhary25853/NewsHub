 import React from 'react';

const NewsItem = ({ title, description, imageurl, newsurl, date }) => {
  return (
    <>
    <span className="badge text-bg-danger mx-2">New</span>
    <div className="card my-2 bg-secondary text-light ">
      <img
        src={imageurl || 'https://via.placeholder.com/400x200?text=No+Image'}
        className="card-img-top"
        alt="News"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <span className="badge bg-secondary mx-3" id="date-badge">{date}</span>
        <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm">
          Read More
        </a>
      </div>
    </div>
    </>
  );
};

export default NewsItem;
