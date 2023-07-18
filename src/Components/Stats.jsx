import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { notifyError, notifySuccess, notifyWarning } from "../Utils/toastify";
import errorMapping from "../Utils/errorMapping";

const Stats = ({
  WPM,
  accuracy,
  correctChars,
  incorrectChars,
  extraChars,
  missedChars,
  graphData,
}) => {
  //Logic to avoid redandant graphData
  const timeSet = new Set();
  const newGraphData = graphData.filter((e) => {
    if (!timeSet.has(e[0])) {
      timeSet.add(e[0]);
      return e;
    }
  });

  //Push data to the database
  const pushDataToDB = () => {
    if (isNaN(accuracy)) {
      notifyError("Invalid test!")
      return;
    }
    const resultRef = db.collection("Results"); //Reference to the database
    const { uid } = auth.currentUser; //Get userID of the current user
    resultRef
      .add({
        userID: uid,
        timeStamp: new Date(),
        WPM,
        accuracy,
        correctChars,
        incorrectChars,
        extraChars,
        missedChars,
      })
      .then((res) => notifySuccess("Results saved successfully!"))
      .catch((err) =>
        notifyError(errorMapping[err.code] || "Some error occured!")
      );
  };

  //Saves the results when the user logged in
  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      notifyWarning("Login to save results!");
    }
  }, []);
  return (
    <Container>
      <div className="stat-box">
        {/* Numerical representation of user stats */}
        <div className="left-stat">
          <div className="stat-item">
            <div className="title">WPM</div>
            <div className="sub-title">{WPM}</div>
          </div>
          <div className="stat-item">
            <div className="title">Accuracy(%)</div>
            <div className="sub-title">{accuracy}</div>
          </div>
          <div className="stat-item">
            <div className="title">Correct Characters</div>
            <div className="sub-title">{correctChars}</div>
          </div>
          <div className="stat-item">
            <div className="title">Incorrect Characters</div>
            <div className="sub-title">{incorrectChars}</div>
          </div>
          <div className="stat-item">
            <div className="title">Extra Characters</div>
            <div className="sub-title">{extraChars}</div>
          </div>
          <div className="stat-item">
            <div className="title">Missed Characters</div>
            <div className="sub-title">{missedChars}</div>
          </div>
        </div>
        {/* Graphical representation of user stats */}
        <div className="right-stat">
          <Graph graphData={newGraphData} />
        </div>
      </div>
    </Container>
  );
};

export default Stats;
