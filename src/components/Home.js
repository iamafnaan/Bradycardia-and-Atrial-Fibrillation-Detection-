import React, { useState } from "react";
import { Button, Navbar, Nav, Dropdown, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { FaSun, FaMoon, FaSignOutAlt, FaBars } from "react-icons/fa";
import HealthCard from "./HealthCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("#ffd0d2");
  const [healthData, setHealthData] = useState({
    heart: 0,
    SpO2: 0,
    temperature: 0,
  });
  const [showHealthCard, setShowHealthCard] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false); // State to control modal visibility

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "#ffd0d2" ? "black" : "#ffd0d2";
    setTheme(newTheme);
    document.body.style.backgroundColor = newTheme;
  };

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch("/Fuzzy/route");
      if (response.ok) {
        const data = await response.json();
        setHealthData(data);
        setShowHealthCard(true);
        // Set message based on label
        if (data.result.label === "normal") {
          setMessage(
            <>
              <p>Congratulations, your health looks splendid!</p>
              <p>
                A normal heart condition, also known as sinus rhythm, is
                characterized by a regular and steady heartbeat within the
                normal range of 60 to 100 beats per minute. In this state, the
                heart's electrical system functions smoothly, coordinating the
                contractions of the atria and ventricles to maintain an
                efficient blood flow throughout the body.
              </p>
              <p>Various factors contribute to a normal heart rhythm:</p>
              <ul>
                <li>
                  <strong>Healthy Lifestyle:</strong> Regular exercise, a
                  balanced diet, and maintaining a healthy weight contribute to
                  overall heart health.
                </li>
                <li>
                  <strong>Adequate Hydration:</strong> Proper fluid balance is
                  essential for optimal heart function.
                </li>
                <li>
                  <strong>Normal Electrolyte Levels:</strong> Balanced levels of
                  electrolytes, such as potassium and sodium, play a crucial
                  role in maintaining a normal heart rhythm.
                </li>
                <li>
                  <strong>Absence of Underlying Cardiac Conditions:</strong>{" "}
                  Unlike bradycardia or atrial fibrillation, a normal heart
                  condition is not associated with specific heart-related
                  disorders.
                </li>
              </ul>
              <p>
                <strong>Symptoms:</strong> Individuals with a normal heart
                condition typically do not experience symptoms related to an
                irregular heartbeat. They may enjoy a consistent and comfortable
                heart rate that supports normal daily activities without any
                noticeable discomfort.
              </p>
              <p>
                <strong>Prevention and Monitoring:</strong> Maintaining a
                healthy lifestyle, managing stress, and addressing underlying
                health conditions contribute to the prevention of heart rhythm
                disorders. Regular check-ups with healthcare providers help
                monitor heart health and detect any potential issues early on.
              </p>
              <p>
                <strong>Consultation:</strong> Consulting a general cardiologist
                or primary care physician is appropriate for those with a normal
                heart condition to ensure overall cardiovascular health.
              </p>
            </>
          );
        } else if (data.result.label === "bradycardia") {
          setMessage(
            <>
              <p>
                Your heart rate is lower than normal. Please consult a doctor.
              </p>
              <p>
                Bradycardia is traditionally defined as a heart rate of less
                than 60 beats per minute. A normal heartbeat is between 60 and
                100 beats per minute. It can occur due to medical illnesses not
                related to the heart, such as:
              </p>
              <ul>
                <li>An underactive thyroid gland (hypothyroidism)</li>
                <li>An abnormally low body temperature (hypothermia)</li>
                <li>A very high blood potassium level</li>
                <li>Lyme disease</li>
                <li>Typhoid fever</li>
              </ul>
              <p>Symptoms of bradycardia may include:</p>
              <ul>
                <li>Chest pain</li>
                <li>Confusion or memory problems</li>
                <li>Dizziness or lightheadedness</li>
                <li>Easily tiring during physical activity</li>
                <li>Fatigue</li>
                <li>Fainting (syncope) or near-fainting</li>
                <li>Shortness of breath</li>
              </ul>
              <p>Best Doctors for Bradycardia in Bangalore:</p>
              <ul>
                <li>Dr. Ganesh Nallur Shivu</li>
                <li>Dr. G Vivek</li>
                <li>Dr. Ravindranath Reddy D.R.</li>
              </ul>
            </>
          );
        } else if (data.result.label === "atrial_fibrillation") {
          setMessage(
            <>
              <p>Your heart rhythm is irregular. Please consult a doctor.</p>
              <p>
                Atrial fibrillation is a quivering or irregular heartbeat, or
                arrhythmia. Atrial fibrillation, also known as AFib or AF, can
                lead to blood clots, stroke, heart failure and other
                heart-related complications.
              </p>
              <p>Causes of atrial fibrillation may include:</p>
              <ul>
                <li>Advancing age</li>
                <li>High blood pressure</li>
                <li>Obesity</li>
                <li>European ancestry</li>
                <li>Diabetes</li>
                <li>Heart failure</li>
                <li>Ischemic heart disease</li>
                <li>Hyperthyroidism</li>
                <li>Chronic kidney disease</li>
                <li>Moderate to heavy alcohol use</li>
                <li>Smoking</li>
                <li>
                  Enlargement of the chambers on the left side of the heart
                </li>
              </ul>
              <p>Symptoms of atrial fibrillation may include:</p>
              <ul>
                <li>Irregular heartbeat</li>
                <li>Heart palpitations (rapid, fluttering, or pounding)</li>
                <li>Lightheadedness</li>
                <li>Extreme fatigue</li>
                <li>Shortness of breath</li>
                <li>Chest pain</li>
              </ul>
              <p>Best Doctors for AFib in Bangalore:</p>
              <ul>
                <li>Dr. Ganesh Nallur Shivu</li>
                <li>Dr. G Vivek</li>
                <li>Dr. Ravindranath Reddy D.R.</li>
              </ul>
            </>
          );
        } else {
          setMessage(data.result.label); // Display the label if it's neither normal, bradycardia nor atrial fibrillation
        }
        setShowMessageModal(true); // Show modal when data is fetched
      } else {
        console.error("Failed to fetch data from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "black" ? "dark text-white" : ""}`}
    >
      <Navbar
        bg="#800000"
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
            {theme === "#ffd0d2" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button variant="link" className="text-white" onClick={handleLogout}>
            <FaSignOutAlt />
          </Button>
        </Nav>
      </Navbar>
      <div className="container mx-auto px-4 py-8">
        {showHealthCard && (
          <div className="flex justify-center mb-4">
            <HealthCard
              heartRate={healthData.heart}
              spO2={healthData.SpO2}
              temperature={healthData.temperature}
            />
          </div>
        )}
        <div className="text-center">
          <Modal
            show={showMessageModal} // Show the modal when showMessageModal is true
            onHide={() => setShowMessageModal(false)} // Hide the modal when onHide event occurs
            centered
          >
            <Modal.Header closeButton style={{ backgroundColor: "#fffeea" }}>
              <Modal.Title style={{ color: "#000000" }}>
                Health Message
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#fffeea" }}>
              {message}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#fffeea" }}>
              <Button
                variant="secondary"
                onClick={() => setShowMessageModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div
            className="d-flex justify-content-center mb-4"
            style={{ paddingLeft: "66px" }}
          >
            <Button variant="primary" onClick={fetchDataFromServer}>
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
