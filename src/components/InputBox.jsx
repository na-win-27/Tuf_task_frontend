import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MoonLoader from "react-spinners/MoonLoader";

import Button from "@mui/material/Button";

export default function InputBox({ output, inp, onInput, postCodes, loading }) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItem: "center",
        flex: 1,
        margin: "30px 50px 0 20px",
        color: "white",
      }}
    >
      <Typography
        sx={{
          flex: 2,
          color: "white",
        }}
        variant="h4"
      >
        {!output ? "Give Your Input" : "Compilation Result:"}
      </Typography>

      <Typography
        sx={{
          color: "green",
        }}
        variant="h4"
      >
        {!output ? "" : output}
      </Typography>

      <TextField
        sx={{
          flex: 20,
        }}
        placeholder="Enter the Input for Compilation"
        multiline
        inputProps={{
          style: {
            color: "red",
            border: "1px grey solid ",
            width: "400px",
            padding: "10px",
          },
        }}
        rows={10}
        value={inp}
        onChange={(e) => onInput(e.target.value)}
      />
      {loading ? (
        <MoonLoader color="#36d7b7" size={30} loading />
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{
            flex: 1,
            width: "400px",
            marginLeft: "20px  ",
          }}
          onClick={() => postCodes()}
        >
          Submit Code
        </Button>
      )}
    </Box>
  );
}
