import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import { useTheme } from "../Context/ThemeContext";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { theme } = useTheme();

  //Function to fetch user data
  const fetchUserData = () => {
    //Create reference to the database collection
    const resultRef = db.collection("Results");
    resultRef
      .where("userID", "==", user.uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        const tempData = [];
        const tempGraphData = [];
        snapshot.docs.map((doc) => {
          tempData.push(doc.data());
          tempGraphData.push([
            new Date(doc.data().timeStamp.toDate()).toLocaleDateString() +
              " / " +
              new Date(doc.data().timeStamp.toDate()).toLocaleTimeString(),
            doc.data().WPM,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData);
      });
  };

  useEffect(() => {
    //If user is available call the fetchUserData function
    if (user) fetchUserData();

    //If no loading and no user is available then navigate to the home page
    if (!loading && !user) navigate("/");
  }, [loading]);

  //If loading show the loader
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RotatingLines
          strokeColor={theme.borderColor}
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className="UserPage">
      <div className="graphData" style={{ padding: "20px" }}>
        <Graph graphData={graphData} />
      </div>
      <div className="tableData" style={{ padding: "20px" }}>
        <TableUserData data={data} />
      </div>
    </div>
  );
};

export default UserPage;
