import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const API_KEY = "bef8eb024c885302e7002e308616e7e8";

  const fetchArticles = async (page = 1) => {
    try {
      props.setProgress(20);
      setLoading(true);

      const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=${props.pagesize}&apikey=${API_KEY}&page=${page}`;

      const response = await fetch(url);
      props.setProgress(50);

      const parsedData = await response.json();
      props.setProgress(80);

      setArticles(parsedData.articles || []);
      setTotalArticles(parsedData.totalArticles || 0);
      setPage(page);
      setLoading(false);

      props.setProgress(100);
    } catch (err) {
      console.error("API ERROR:", err);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;

      const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=${props.pagesize}&apikey=${API_KEY}&page=${nextPage}`;

      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles((prev) => prev.concat(parsedData.articles || []));
      setTotalArticles(parsedData.totalArticles || totalArticles);
      setPage(nextPage);
    } catch (err) {
      console.error("LOAD MORE ERROR:", err);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, [props.category, props.country]); // re-fetch if category changes

  return (
    <div className="bg-dark text-light">
      <h1 className="headline text-center">NewzHub Top Headlines</h1>

      {loading && <h4 className="text-center">Loading...</h4>}

      {!loading && articles.length === 0 && (
        <h4 className="text-center">No articles found</h4>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalArticles}
        loader={<h4 className="text-center my-4">Loading more...</h4>}
      >
        <div className="container">
          <div className="row">
            {articles.map((news) => (
              <div className="col-md-4" key={news.url}>
                <NewsItem
                  title={news.title || "No Title"}
                  description={news.description || "No Description"}
                  imageurl={news.image}
                  newsurl={news.url}
                  date={news.publishedAt}
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
