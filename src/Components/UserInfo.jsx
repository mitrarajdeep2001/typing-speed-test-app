import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { AccountCircleRounded } from "@mui/icons-material";

const UserInfo = ({dataLength}) => {
  const [user] = useAuthState(auth);
  return (
    <div className="user-profile">
      <div className="user_pic">
        <AccountCircleRounded sx={{fontSize:"14rem"}}/>
      </div>
      <div className="user-info">
        <div className="email">Email: <span>{user.email}</span></div>
        <div className="joined-at">Creation Time: <span>{user.metadata.creationTime}</span></div>
        <div className="last-signedin-time">Last signedin Time: <span>{user.metadata.lastSignInTime}</span></div>
        <div className="No. of tests taken">No. of tests taken: <span>{dataLength}</span></div>
      </div>
    </div>
  );
};

export default UserInfo;
