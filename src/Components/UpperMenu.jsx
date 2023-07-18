/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import BasicSelect from "./Modes";
import { Box, Container } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useTestMode } from "../Context/TextModeContext";

const UpperMenu = () => {
  const {
    startTimer,
    testTime,
    setTestOver,
    intervalID,
    setIntervalID,
    setGraphData,
    setCorrectChars,
  } = useTestMode(); //Get the value of selected mode by the user and also get the setTestOver, intervalID, setIntervalID
  const [countDown, setCountDown] = useState(testTime); //Initialised the countDown and defined setCountDown function

  useEffect(() => setCountDown(testTime), [testTime]); //Updates the countDown

  const timer = () => {
    let id = setInterval(
      () =>
        setCountDown((prev) => {
          //Logic to get the graph data
          setCorrectChars((correctChars) => {
            setGraphData((graphData) => {
              return [
                ...graphData,
                [
                  testTime - prev + 1,
                  correctChars / 5 / ((testTime - prev + 1) / 60),
                ],
              ];
            });
            return correctChars;
          });
          return prev - 1;
        }),
      1000
    );
    setIntervalID(id);
  };
  useEffect(() => {
    //If startTimer is true then call the timer
    if (startTimer) {
      timer();
    }
  }, [startTimer]);

  //If the countDown is 0 then clear the interval
  if (intervalID && countDown === 0) {
    clearInterval(intervalID);
    setTestOver(true);
  }
  return (
    <Container>
      <Box className="upper-menu">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <BasicSelect />
        </div>
        <div className="timer">
          <AccessAlarmIcon style={{ fontSize: "2rem" }} />{" "}
          <span>{countDown}s</span>
        </div>
      </Box>
    </Container>
  );
};

export default UpperMenu;
