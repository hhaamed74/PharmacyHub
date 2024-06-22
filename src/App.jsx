import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Hourglass } from "react-loader-spinner";
import "./App.css";

const App = () => {
  const [buttonTop, setButtonTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setButtonTop(true);
      } else {
        setButtonTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <div className="text">
            <h1>PharmacyHub</h1>
          </div>
          <Hourglass
            id="spinner"
            visible={true}
            height={80}
            width={80}
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#008829", "#008829"]}
          />
        </div>
      ) : (
        <Fragment>
          <Layout />
          <button className="chat-button" onClick={() => navigate("/chat")}>
            Chat
          </button>
        </Fragment>
      )}
      {buttonTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`btn-top ${buttonTop ? "visible" : ""}`}
        >
          Top
        </button>
      )}
    </div>
  );
};

export default App;
