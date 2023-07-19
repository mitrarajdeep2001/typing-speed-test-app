import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "../Context/ThemeContext";
import Account from "./Account";

export default function Header() {
  const { theme } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: theme.appBar, color: theme.textColor }}
      >
        <Toolbar sx={{ marginInline: "25px" }}>
          <Typography variant="h6" component="div" sx={{display: "flex", flexGrow: 1, alignItems: "center" }}>
          <img src="https://github.com/mitrarajdeep2001/typing-speed-test-app2/blob/main/logo.png?raw=true" alt="logo" style={{width: "80px", height: "50px", borderRadius: "10px"}}/>
          </Typography>
          <Account />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
