import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import "./GraphSp.css";

const GraphSp = () => {
  const [heartList, setHeartList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/Fuzzy/route");
      setHeartList(response.data.SpO2List);
    } catch (error) {
      console.error("Error fetching heart data:", error);
    }
  };

  return (
    <div className="graph-container">
      <h2 className="text-center mb-4">SpO2 Plot</h2>

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
          title: "SpO2 Readings",
          xaxis: { title: "Instance" },
          yaxis: { title: "SpO2" },
          margin: { l: 50, r: 50, t: 50, b: 50 },
          hovermode: "closest",
          showlegend: false,
        }}
      />
    </div>
  );
};

export default GraphSp;
