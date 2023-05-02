import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";
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

  return (
    <div className="App p-5">
      <div className="banner mb-5">
        <Banner />
      </div>
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
            <div className="pop_up_body bg-white w-75 h-75">
              <div className="pop_up_content">
                {popUpContent.map((content) => {
                  return (
                    <div className="pop_up_details d-flex flex-row">
                      <div className="image">
                        <img src={url + content.poster_path} />
                      </div>
                      <div className="p-4">
                        <p>
                          Name: {content.title} {content.name}
                        </p>
                        <p> Type: {content.media_type}</p>
                        <p> Overview: {content.overview}</p>
                        <p> Release Date: {content.release_date}</p>
                        <div className="pop_up_footer w-100">
                          <button
                            className="btn btn-dark"
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
