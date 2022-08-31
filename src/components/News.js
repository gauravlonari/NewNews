import React, { useContext, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import NoImage from "../other/No_Image.jpg";
import { capitalize } from "./CommonFunctions.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import { useState } from "react";
import { context } from "../App";
import { ar1, ar2, ar3, ar4, ar5 } from "../other/staticArticles.js";

export function News(props) {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [headline, setHeadline] = useState(props.category);
  const [staticNews, setStaticNews] = useState(false);
  
  const contexx = useContext(context);

  const handleStatic = async () => {
    props.setProgress(10);
    setStaticNews(true);
    setArticles([]);
    setTotalResults(414);
    setPage(0);
    setHeadline("General");
    props.setProgress(50);
    contexx.Alert(
      "success",
      "Switched to demo. Static news are loaded.",
      0,
      false
    );
    setTimeout(()=>{
    contexx.Alert("success","Welcome to NewNews. Daily Dose of Latest News!",0,false);
    },3000);
    setTimeout(()=>{
      props.setProgress(100);
    },1000);
  };
  
  useEffect(() => {
    let fetchNews = async () => {
      setError(false);
      if (staticNews) {
        props.setProgress(10);
        let parsedData;
        switch (page+1) {
          case 1:
            parsedData = ar1;
            break;
          case 2:
            parsedData = ar2;
            break;
            case 3:
              parsedData = ar3;
              break;
              case 4:
                parsedData = ar4;
                break;
                case 5:
                  parsedData = ar5;
                  setError(true);
                  break;
                  default:
                    parsedData = [];
                  }
                  setArticles(articles.concat(parsedData));
                  props.setProgress(50);
                  setTimeout(()=>{
                    props.setProgress(100);
                  },1000);
                  console.log(
                    "Fetched: " +
                    parsedData.length +
                    "/" +
                    totalResults +
                    " Length: " +
            articles.length
            );
          } else {
            props.setProgress(10);
            try {
              let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
              let data = await fetch(url);
              if (data.type === "cors" && data.status === 426) {
                contexx.Alert(
                  "danger",
                  "Requests outside localhost are not processed by NewsAPI. Try the static or download from main branch and run on localhost.",
              0,
              false
            );
          }
          props.setProgress(30);
          let parsedData = await data.json();
          props.setProgress(60);
          if (parsedData.status === "ok") {
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setError(false);
            if (parsedData.articles.length < props.pageSize) setError(true);
            console.log(
              "Fetched: " +
                parsedData.articles.length +
                "/" +
                parsedData.totalResults +
                " Length: " +
                articles.length
            );
          } else {
            setError(true);
          }
        } catch (e) {
          if (e instanceof TypeError)
            contexx.Alert("danger", "Cannot connect to Internet", 0, false);
          setError(true);
        }
        props.setProgress(100);
      }
    };
    fetchNews();
    // eslint-disable-next-line
  }, [page]);

  let loadMoreNews = async () => {
    setPage(page + 1);
  };

  let getSuitableDescription = (description) => {
    if (description)
      if (description.length < 80)
        return description + ". " + "\u00A0".repeat(80 - description.length);
      else return description.substring(0, 80) + "...";
    else return "\u00A0".repeat(120);
  };

  return (
    <>
      <div
        className="container mb-5 d-flex flex-wrap flex-column justify-content-center"
        style={{ marginTop: "5vh" }}
      >
        <h2 className="w-100" style={{ textAlign: "center" }}>
          Top {capitalize(headline)} Headlines
        </h2>

        <InfiniteScroll
          dataLength={articles.length}
          next={loadMoreNews}
          hasMore={articles.length <= totalResults && !error}
          loader={<Loading />}
        >
          <div className="d-flex flex-wrap justify-content-center my-3">
            {articles.map((object, i) => (
              <NewsItem
                title={object.title ? object.title.substring(0, 45) : "..."}
                desc={getSuitableDescription(object.description)}
                imageUrl={object.urlToImage ? object.urlToImage : NoImage}
                newsId={object.url}
                key={i}
                time={object.publishedAt}
                author={object.author}
                source={object.source.name}
              />
            ))}

            {articles.length === 0 && error ? (
              <div className="d-flex align-content-center flex-column">
                <h5 className="my-3">No Articles Found</h5>
                <button
                  className="btn btn-sm btn-primary mx-3"
                  onClick={handleStatic}
                >
                  Load Static
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </InfiniteScroll>
        {error && articles.length !== 0 ? (
          <h5 className="my-3 text-center">No More Articles</h5>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
News.defaultProps = {
  pageSize: 20,
  country: "in",
  category: "general",
};
News.propTypes = {
  pageSize: PropTypes.number,
};
export default News;
