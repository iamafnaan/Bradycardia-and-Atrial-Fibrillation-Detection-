import React, { useState } from "react";
import "./Temperature.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import GraphTemp from "./GraphTemp";
import { Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaBars, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/UserAuthContext";
const Temperature = () => {
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
                Understanding Body Temperature: A Key Indicator of Health
              </h2>
              <p className="card-text">
                Welcome to our guide on body temperature! In this article, we'll
                explore the significance of body temperature, its importance in
                assessing overall health, and what different temperature ranges
                mean.
              </p>

              <h3 className="card-title">Why Body Temperature Matters:</h3>
              <p className="card-text">
                Body temperature is a vital sign that reflects the balance
                between heat production and heat loss within the body.
                Maintaining a stable body temperature is essential for the
                proper functioning of enzymes, metabolic processes, and overall
                physiological function.
              </p>

              <h3 className="card-title">
                Interpreting Body Temperature Ranges:
              </h3>
              <p className="card-text">
                <strong>Normal Range:</strong> The average normal body
                temperature is typically around 98.6°F (37°C) when measured
                orally. However, individual variations can occur, and a normal
                temperature can range between 97°F (36.1°C) and 99°F (37.2°C).
                Rectal and ear temperatures may be slightly higher.
              </p>

              <h3 className="card-title">Conclusion:</h3>
              <p className="card-text">
                Understanding body temperature and its significance is crucial
                for assessing overall health and detecting potential health
                problems. By monitoring your body temperature and recognizing
                abnormal readings, you can take appropriate steps to maintain
                wellness and seek medical attention when necessary.
              </p>
            </div>
          </div>
          <div className="graph-container">
            <GraphTemp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temperature;
