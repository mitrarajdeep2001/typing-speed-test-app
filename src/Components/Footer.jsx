import { AppBar } from "@mui/material";
import React from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import PaletteIcon from '@mui/icons-material/Palette';

const Footer = () => {
  const { setTheme, theme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div>
      <AppBar
        position="static"
        // Styles for the footer
        sx={{
          minHeight: "100px",
          bgcolor: theme.appBar,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "600px",
        }}
      >
        <div className="links" style={{color: theme.textColor}}>Links</div>
        <div className="theme">
        <PaletteIcon style={{fontSize:"30px", color: theme.textColor}}/>
          <Select
            onChange={handleChange}
            options={themeOptions}
            menuPlacement="top"
            defaultValue={{ label: theme.label, value: theme }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: theme.AppBar,
                borderColor: "#ffffff",
                cursor: "pointer"
              }),
              singleValue: (base, state) => ({
                ...base,
                color: theme.textColor,
                fontWeight: "bold"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? theme.appBar : "#fff",
                color: !state.isSelected ? "#000" : "#fff",
                cursor: "pointer",
              }),
            }}
          />
        </div>
      </AppBar>
    </div>
  );
};

export default Footer;
