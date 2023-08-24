import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { notifyError, notifySuccess } from "../Utils/toastify";
import errorMapping from "../Utils/errorMapping";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  const handleSignup = () => {
    //Check if none of field is empty or not
    if (!email || !password || !confirmPassword) {
      //React toastify alert message for error
      notifyError("Please fill all the fields!")
      return;
    }
    //Check if password and confirm password matching or not
    if (password !== confirmPassword) {
      //React toastify alert message for error
      notifyError("Password Mismatch!")
      return;
    }

    //Creats user and store it on firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //React toastify alert message for success
        notifySuccess("Account Created Successfully!")
        console.log(res)
      })
      .catch((err) => {
        //React toastify alert message for error
        notifyError(errorMapping[err.code] || "Some error occured!")
        console.log(err);
      });
  };
  return (
    <Box display="flex" flexDirection="column" gap="20px" padding="15px">
      <TextField
        type="email"
        variant="outlined"
        label="Enter email"
        required="true"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor, //Set the color of label
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText, //Set the color of input box text
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.borderColor, // Set the desired border color
            },
            "&:hover fieldset": {
              border: `2px solid ${theme.borderColor}`, // Set the desired border size, style and color on hover
            },
          },
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Enter password"
        required="true"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor, //Set the color of label
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText, //Set the color of input box text
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.borderColor, // Set the desired border color
            },
            "&:hover fieldset": {
              border: `2px solid ${theme.borderColor}`, // Set the desired border size, style and color on hover
            },
          },
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Enter confirm password"
        required="true"
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor, //Set the color of label
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText, //Set the color of input box text
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.borderColor, // Set the desired border color
            },
            "&:hover fieldset": {
              border: `2px solid ${theme.borderColor}`, // Set the desired border size, style and color on hover
            },
          },
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          //Set dedired styles to the button
          bgcolor: theme.appBar,
          "&:hover": { bgcolor: theme.appBar, transform: "scale(1.1)" },
          transition: "transform ease-out 0.2s",
        }}
        onClick={handleSignup}
      >
        Create Account
      </Button>
    </Box>
  );
};

export default SignupForm;
