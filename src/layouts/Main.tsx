import React from "react";
import useMockData from "../utils/mockData";

const Main: React.FC = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main page</h1>
      <h3>Initialize data</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        Initialize
      </button>
    </div>
  );
};

export default Main;
