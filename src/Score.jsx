import React, { useState } from "react";

import { useAppContext } from "./Context";
import "./App.css";


function ScoreCard() {
  const { currentScore, bestScore } = useAppContext();

  return (
    <div className="score-card">
      <h3>High Score: {bestScore}</h3>
      <h3>Current Score: {currentScore}</h3>
    </div>
  );
}

export default ScoreCard;
