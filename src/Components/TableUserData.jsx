import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

const TableUserData = ({ data }) => {
  const { theme } = useTheme();
  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                WPM
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Accuracy
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Correct Characters
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Incorrect Characters
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Extra Characters
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Missed Characters
              </TableCell>
              <TableCell
                style={{ color: theme.textColor, textAlign: "center" }}
              >
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((e, i) => (
              <TableRow key={i}>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.WPM}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.accuracy}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.correctChars}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.incorrectChars}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.extraChars}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {e.missedChars}
                </TableCell>
                <TableCell
                  style={{ color: theme.textColor, textAlign: "center" }}
                >
                  {new Date(e.timeStamp.toDate()).toLocaleDateString()} &{" "}
                  {new Date(e.timeStamp.toDate()).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableUserData;
