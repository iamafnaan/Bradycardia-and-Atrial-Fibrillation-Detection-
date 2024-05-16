import React, { useState } from "react";
import "./SpO2.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import GraphSp from "./GraphSpO2";
import { Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaBars, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/UserAuthContext";

const SpO2 = () => {
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
                Understanding Oxygen Saturation: A Vital Measure of Respiratory
                Health
              </h2>
              <p className="card-text">
                Welcome to our guide on oxygen saturation! In this article,
                we'll explore the significanceof oxygen saturation percentage,
                its importance in assessing respiratory health, and what
                different saturation levels mean.
              </p>

              <h3 className="card-title">Why Oxygen Saturation Matters:</h3>
              <p className="card-text">
                Oxygen saturation, often abbreviated as SpO2, measures the
                percentage of oxygen-bound hemoglobin in the blood. It indicates
                how effectively your lungs are oxygenating your blood.
                Maintaining adequate oxygen saturation is essential for the
                proper functioning of vital organs and tissues.
              </p>

              <h3 className="card-title">
                Interpreting Oxygen Saturation Levels:
              </h3>
              <p className="card-text">
                <strong>Normal Range:</strong> A normal oxygen saturation level
                is typically between 95% and 100%. This indicates that your
                blood is adequately oxygenated, and your body is receiving the
                oxygen it needs for optimal function.
              </p>

              <h3 className="card-title">Conclusion:</h3>
              <p className="card-text">
                Remember, if you have any concerns about your heart rate or
                cardiovascular health, consult with a healthcare professional
                for personalized advice and guidance.
              </p>
            </div>
          </div>
          <div className="graph-container">
            <GraphSp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpO2;
