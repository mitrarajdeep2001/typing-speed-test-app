import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs, Box } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { notifySuccess, notifyError } from "../Utils/toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const googleProvider = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  //Open the modal component
  const handleOpen = () => {
    if (user) {
      //If user exists then navigate to the user page
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  //Close the modal component
  const handleClose = () => {
    setOpen(false);
  };

  //Close the modal after successfully logged in or signed up
  useEffect(() => handleClose(), [user]);

  //Handles switching between login and signup component
  const handleChange = (e, v) => {
    setValue(v);
  };

  //Handles google signin
  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        //React toastify alert message for success
        notifySuccess("Successfully LoggedIn!");
      })
      .catch((err) => {
        //React toastify alert message for error
        notifyError(errorMapping[err.code] || "Google authentication error!");
        console.log(err);
      });
  };

  //Handles user logout
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => notifySuccess("Successfully logged out!"))
      .catch((err) =>
        notifyError(errorMapping[err.code] || "Some error occured!")
      );
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      {user && (
        <IconButton
          size="large"
          aria-label="logout the current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} //Style the modal
      >
        <div
          style={{
            width: "500px",
            border: `0px solid ${theme.borderColor}`,
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <AppBar
            position="static"
            sx={{ bgcolor: theme.appBar, borderRadius: "5px" }}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              sx={{
                "& .Mui-selected": {
                  color: theme.backgroundColor, // Change this to the desired color for the selected tab
                  fontWeight: "bold",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.backgroundColor, // Change this to the desired color for the indicator line
                  height: "3px", //Set the desired height for the indicator
                },
                borderRadius: "5px",
              }}
            >
              <Tab label="Login" sx={{ color: "#fff" }} />
              <Tab label="SignUp" sx={{ color: "#fff" }} />
            </Tabs>
          </AppBar>
          {/* If value of the Tab component is 0 then show LoginForm component */}
          {value === 0 && <LoginForm />}

          {/* If value of the Tab component is 1 then show SignupForm component */}
          {value === 1 && <SignupForm />}
          <Box
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            borderRadius="10px"
            width="100%"
          >
            <div style={{ color: theme.textColor }}>OR</div>
            <GoogleButton
              style={{ width: "100%" }}
              onClick={handleGoogleSignin}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default Account;
