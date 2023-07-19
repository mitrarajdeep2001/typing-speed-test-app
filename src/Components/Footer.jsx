import { AppBar, Box } from "@mui/material";
import React from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import PaletteIcon from "@mui/icons-material/Palette";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

const Footer = () => {
  const { setTheme, theme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
        <div
          className="links"
          style={{ color: theme.textColor, display: "flex", gap: "50px" }}
        >
          {/* Social media handles */}
          <Link
            to="https://www.linkedin.com/in/rajdeep-mitra"
            style={{ color: "inherit" }}
            target="_blank"
          >
            <LinkedInIcon sx={{ fontSize: "2rem", cursor: "pointer" }} />
          </Link>
          <Link
            to="https://github.com/mitrarajdeep2001"
            style={{ color: "inherit" }}
            target="_blank"
          >
            <GitHubIcon sx={{ fontSize: "2rem", cursor: "pointer" }} />
          </Link>
          <Link
            to="https://www.facebook.com/rajdeep.mitra.90"
            style={{ color: "inherit" }}
            target="_blank"
          >
            <FacebookIcon sx={{ fontSize: "2rem", cursor: "pointer" }} />
          </Link>
        </div>
        {/* Theme Selector */}
        <div className="theme">
          <PaletteIcon style={{ fontSize: "2rem", color: theme.textColor }} />
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
                cursor: "pointer",
              }),
              singleValue: (base, state) => ({
                ...base,
                color: theme.textColor,
                fontWeight: "bold",
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
    </Box>
  );
};

export default Footer;
