import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTestMode } from "../Context/TextModeContext";
import { useTheme } from "../Context/ThemeContext";

export default function BasicSelect() {
  const { testTime, setTestTime } = useTestMode();
  const { theme } = useTheme();

  const updateTestTime = (event) => {
    setTestTime(event.target.value);
  };

  return (
    <FormControl
      sx={{
        //Change the border color
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: theme.borderColor,
        },
        //Change the border width and color on hover
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.borderColor,
          borderWidth: "0.10rem",
        },
        width: "100px",
      }}
    >
      <InputLabel id="demo-simple-select-label" style={{ color: theme.textColor, fontWeight:"bold" }}>
        Mode
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={testTime}
        label="TestTime"
        onChange={updateTestTime}
        sx={{
          "& .MuiSelect-icon": {
            color: theme.borderColor, // Change the color of the dropdown arrow
          },
          "& .MuiSelect-select": {
            color: theme.textColor, // Change the color of the selected item
            borderWidth: "0.15rem",
          },
          //Change the border width and color on hover
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.borderColor,
            borderWidth: "0.10rem",
          },
        }}
      >
        <MenuItem value={15}>15s</MenuItem>
        <MenuItem value={30}>30s</MenuItem>
        <MenuItem value={60}>60s</MenuItem>
        <MenuItem value={120}>120s</MenuItem>
      </Select>
    </FormControl>
  );
}
