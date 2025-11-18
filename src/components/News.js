import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    fetchArticles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.country]); // Re-fetch on prop change

  const fetchArticles = async (page) => {
    props.setProgress(10);
    setLoading(true);

    // Use Netlify function in production, direct API in development
    const isProduction = window.location.hostname !== 'localhost';
    const url = isProduction 
      ? `/.netlify/functions/news-api?category=${props.category}&country=${props.country}&max=${props.pagesize}&page=${page}`
      : `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=${props.pagesize}&apikey=bef8eb024c885302e7002e308616e7e8&page=${page}`;

    try {
      const response = await fetch(url);
      props.setProgress(30);
      const parsedData = await response.json();
      props.setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalArticles(parsedData.totalArticles || 0);
      setPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }

    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    // Use Netlify function in production, direct API in development
    const isProduction = window.location.hostname !== 'localhost';
    const url = isProduction
      ? `/.netlify/functions/news-api?category=${props.category}&country=${props.country}&max=${props.pagesize}&page=${nextPage}`
      : `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=${props.pagesize}&apikey=bef8eb024c885302e7002e308616e7e8&page=${nextPage}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
      setTotalArticles(parsedData.totalArticles || totalArticles);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more articles:", error);
    }
  };

  return (
    <div className=" bg-dark text-light">
      <h1 className="headline text-center">NewzHub Top Headlines</h1>

      {loading && <h4 className="text-center">Please wait... Loading</h4>}

      {!loading && articles.length === 0 && (
        <h4 className="text-center">No articles found.</h4>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalArticles}
        loader={<h4 className="text-center my-4">Please Wait... Loading</h4>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 70) : "No Title"}
                  description={
                    element.description
                      ? element.description.slice(0, 90)
                      : "No Description"
                  }
                  imageurl={element.image}
                  newsurl={element.url}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pagesize: 10,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
};

export default News;
