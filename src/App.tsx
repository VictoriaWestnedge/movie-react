import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Form, FormControl } from "react-bootstrap";
import "./App.css";
import Banner from "./components/Banner";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

type resultProps = {
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  id: number;
};

export default function App() {
  const [result, setResult] = useState<resultProps[]>([]);
  const url = "https://www.themoviedb.org/t/p/w440_and_h660_face/";
  const [popuptoggle, setpopuptoggle] = useState(false);
  const [popUpContent, setPopUpContent] = useState([]);
  const changeContent = (value) => {
    setPopUpContent([value]);
    setpopuptoggle(!popuptoggle);
  };
  const apiSearch = "https://api.themoviedb.org/3/search/movie?api_key=be5f56c94025cd4e4b6cbded9f0cab75&language=en-US&page=1&include_adult=false"
  const [query, setQuery] = useState('')

  useEffect(() => {
    const api = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=be5f56c94025cd4e4b6cbded9f0cab75",
        {
          method: "GET",
        }
      );
      const jsonData = await data.json();
      setResult(jsonData.results);
    };

    api();
  }, []);

  const searchMovie = async(e) => {
    e.preventDefault();
    console.log("search")
    try{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=be5f56c94025cd4e4b6cbded9f0cab75&language=en-US&page=1&include_adult=false&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setResult(data.results);
    }
    catch(e) {
      console.log(e);
    }
  }

  const changeHandler=(e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="App p-5">
      <div className="banner mb-5">
        <Banner />
      </div>
        <Form className="d-flex justify-content-center mb-5" onSubmit={searchMovie}>
          <FormControl type="search"
          placeholder="Search for a movie"
          aria-label="search"
          className="form w-25"
          name="query"
          value={query} onChange={changeHandler}>
          </FormControl>
          <button className="btn btn-secondary ms-2" type="submit">Search</button>
        </Form>
      <Row>
        {result.map((value) => {
          const truncate = (description) =>
            description?.length > 80
              ? `${description.substring(0, 80)}...`
              : description;
          const average_rating = (rating) =>
            rating >= 70 ? (
              <h6 className="text-primary pt-2 pb-2">
                {rating}% <FaThumbsUp className="Thumbs-up text-primary" />
              </h6>
            ) : (
              <h6 className="text-danger pt-2 pb-2">
                {rating}% <FaThumbsDown className="Thumbs-down text-danger" />
              </h6>
            );
          const url = "https://www.themoviedb.org/t/p/w440_and_h660_face/";

          return (
            <Col sm={3} md={3} lg={3}>
              <div
                className="movie_cards shadow rounded mb-5 d-inline-block"
                style={{ width: "100%" }}
              >
                <div className="img">
                  <img
                    src={url + value.poster_path}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="Description p-4">
                  <h5>
                    <b>
                      {value.title} {value.name}
                    </b>
                  </h5>
                  <h6>{truncate(value.overview)}</h6>
                  {average_rating(Math.round(value.vote_average * 10.0))}
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => changeContent(value)}
                  >
                    More Info
                  </button>
                </div>
              </div>
            </Col>
          );
        })}

        {popuptoggle && (
          <div className="pop_up_container p-5">
            <div className="pop_up_body bg-white w-75">
              <div className="pop_up_content">
                {popUpContent.map((content) => {
                  return (
                    <div className="pop_up_details d-flex flex-row">
                      <div className="image">
                        <img src={url + content.poster_path} className="pop_up_image"/>
                      </div>
                      <div className="p-5">
                        <h2 className="pb-2">
                          {content.title} {content.name}
                        </h2>
                        <h5 className="pb-2"> Type: {content.media_type}</h5>
                        <h5 className="pb-2"> {content.release_date?.length > 0
                        ? `Release Date: ${content.release_date}` : "" }</h5>
                        <h5 className="pb-3">
                          {" "}
                          Average Rating:{" "}
                          {Math.round(content.vote_average * 10)}%
                        </h5>
                        <h6> {content.overview}</h6>
                        <div className="pop_up_footer w-100">
                          <button
                            className="btn btn-secondary mt-3"
                            onClick={changeContent}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
}
