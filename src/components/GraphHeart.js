import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import "./GraphHeart.css";

const GraphHeart = () => {
  const [heartList, setHeartList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/Fuzzy/route"); // Replace '/api/heartData' with your Flask server endpoint
      setHeartList(response.data.heartList);
    } catch (error) {
      console.error("Error fetching heart data:", error);
    }
  };

  return (
    <div className="graph-container">
      {/* Add a class to the parent div */}
      <h2 className="text-center mb-4">Heart Rate Plot</h2>
      {/* Add the text-center class to center the heading */}
      <Plot
        data={[
          {
            x: heartList.map((_, index) => index + 1),
            y: heartList,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: "Heart Rate Readings",
          xaxis: { title: "Instance" },
          yaxis: { title: "Heart Rate" },
          margin: { l: 50, r: 50, t: 50, b: 50 },
          hovermode: "closest",
          showlegend: false,
        }}
      />
    </div>
  );
};

export default GraphHeart;
