import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MoonLoader from "react-spinners/MoonLoader";
import Button from "@mui/material/Button";

export default function InputBox({
  output,
  inp,
  onInput,
  postCodes,
  loading,
  mode,
  compile,
}) {
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

      {!output ? null : (
        <Typography
          sx={{
            flex: 2,
            marginLeft: "5px",
            color: "white",
          }}
          variant="h6"
        >
          Output
        </Typography>
      )}

      {!output ? null : (
        <TextField
          sx={{
            flex: 15,
          }}
          multiline
          inputProps={{
            style: {
              color: "red",
              border: "1px grey solid ",
              width: "400px",
              padding: "10px",
            },
          }}
          rows={8}
          value={output}
        />
      )}

      <TextField
        sx={{
          flex: 10,
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
        rows={7}
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
          onClick={() => compile()}
        >
          Compile Code
        </Button>
      )}

      <Button
        disabled={loading}
        variant="contained"
        color="secondary"
        sx={{
          flex: 1,
          width: "400px",
          marginLeft: "20px  ",
          marginTop: "10px",
        }}
        onClick={() => postCodes()}
      >
        {mode === "edit" ? "Save Changes" : "Save Code"}
      </Button>
    </Box>
  );
}
