import React, { useState } from "react";
import GraphHeart from "./GraphHeart"; // Import the GraphHeart component
import "./HeartRate.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaBars, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/UserAuthContext";

const HeartRate = () => {
  const { currentUser, logout } = useUserAuth();
  const [theme, setTheme] = useState("#F4C2C2");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "#F4C2C2" ? "#1F2937" : "#F4C2C2"));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <Navbar
        bg="#8b4513"
        variant="dark"
        expand="lg"
        className="justify-content-between"
      >
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faHeartPulse} />
          <span style={{ marginLeft: "8px" }}>HeartFit</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Dropdown alignRight>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <FaBars />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  window.open(
                    "https://www.cdc.gov/heartdisease/american_heart_month.htm",
                    "_blank"
                  )
                }
              >
                Heart Disease Awareness
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  window.open(
                    "/https://www.forbes.com/health/nutrition/diet/best-diets-for-heart-health/",
                    "_blank"
                  )
                }
              >
                Diet Info
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  window.open(
                    "https://www.medicalnewstoday.com/articles/5-medical-advances-that-could-change-heart-health-monitoring",
                    "_blank"
                  )
                }
              >
                Medical advances
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="link" className="text-white" onClick={toggleTheme}>
            {theme === "#F4C2C2" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button variant="link" className="text-white" onClick={handleLogout}>
            <FaSignOutAlt />
          </Button>
        </Nav>
      </Navbar>
      <div className="positioned-container">
        <div className="box_heart mx-0 d-flex" style={{ maxWidth: "80rem" }}>
          <div className="card" style={{ marginLeft: "60px" }}>
            <div className="card-body">
              <h2 className="card-title">
                Understanding Heart Rate: Your Guide to Cardiovascular Health
              </h2>
              <p className="card-text">
                Welcome to our comprehensive guide on heart rate! In this
                article, we'll delve into the significance of heart rate, its
                importance in assessing cardiovascular health, and what
                different heart rate ranges signify.
              </p>

              <h3 className="card-title">Why Heart Rate Matters:</h3>
              <p className="card-text">
                Your heart rate, measured in beats per minute (bpm), is a
                crucial indicator of your cardiovascular health. It reflects how
                efficiently your heart is pumping blood throughout your body.
                Monitoring your heart rate can provide valuable insights into
                your fitness level, stress levels, and overall well-being.
              </p>

              <h3 className="card-title">Interpreting Heart Rate Ranges:</h3>
              <p className="card-text">
                <strong>Resting Heart Rate (RHR):</strong> This is your heart
                rate when you're at rest, typically measured in the morning
                before you get out of bed. A lower resting heart rate generally
                indicates better cardiovascular fitness. For adults, a normal
                resting heart rate ranges from 60 to 100 bpm, but highly trained
                athletes may have resting heart rates below 60 bpm.
              </p>
              {/* Include other sections similarly */}

              <h3 className="card-title">Conclusion:</h3>
              <p className="card-text">
                Understanding your heart rate and its significance is key to
                maintaining a healthy lifestyle. By monitoring your heart rate
                during rest, exercise, and recovery, you can make informed
                decisions about your fitness routine and overall well-being.
              </p>

              {/* Render the GraphHeart component */}
            </div>
          </div>
          <div className="graph-container">
            <GraphHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
