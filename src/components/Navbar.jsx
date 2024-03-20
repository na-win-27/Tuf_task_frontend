import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#000000",
        height: "100px",
        color: "#E50914",
      }}
    >
      <div
        style={{
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h2" alignItems="center" fontWeight="bolder">
            TUF
          </Typography>

          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              style={{ color: "#E50914", margin: "10px", padding: "10px" }}
            >
              Editor
            </Button>
            <Button
              onClick={() => {
                navigate("/savedCodes");
              }}
              sx={{
                color: "#E50914",
                margin: "10px",
                padding: "10px",
               
              }}
            >
              Submitted Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
