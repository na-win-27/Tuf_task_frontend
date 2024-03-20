import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LangSelector";
import InputBox from "./InputBox";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

export default function InputPage({ mode }) {
  const navigate = useNavigate();
  let { id } = useParams();
  const [codeId, setcodeId] = React.useState("");
  const [user, setUser] = React.useState("");
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("cpp");
  const [stdIn, setStdIn] = React.useState("");
  const [stdOut, setStdOut] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setsnackbar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackbar(false);
  };

  React.useEffect(() => {
    async function fetchData() {
      axios.get(`http://localhost:4000/genral/${id}`).then(({ data }) => {
        setLoading(false);
        setcodeId(data.data.id);
        setUser(data.data.userId);
        setLanguage(data.data.lang);
        setCode(data.data.snippet);
        setStdIn(data.data.stdIn);
        setStdOut(data.data.stdOut);
      }, []);
    }
    if (mode === "edit") {
      setLoading(true);
      fetchData();
    }
    console.log("hi");
  }, [mode]);
  console.log(code);

  const onSelect = (language) => {
    setLanguage(language);
  };

  const onInput = (inp) => {
    setStdIn(inp);
  };

  console.log(mode);
  const onsubmit = () => {
    if (!user) {
      alert("Enter User Name");
    } else if (mode == "new") {
      setOpen(true);
      axios
        .post("http://localhost:4000/genral", {
          username: user,
          langueage: language,
          code: code,
          stdIn: stdIn,
        })
        .then(({ data }) => {
          setOpen(false);
          setStdOut(data.data.stdOut);
          navigate("/savedCodes");
        });
    } else {
      setOpen(true);
      axios
        .put(`http://localhost:4000/genral/code/${codeId}`, {
          username: user,
          langueage: language,
          code: code,
          stdIn: stdIn,
        })
        .then(({ data }) => {
          setOpen(false);

          setStdOut(data.data.stdOut);
          navigate("/savedCodes");
        });
    }
  };

  const compileCode = () => {
    setOpen(true);
    axios
      .post("http://localhost:4000/judge", {
        username: user,
        langueage: language,
        code: code,
        stdIn: stdIn,
      })
      .then(({ data }) => {
        console.log(data);
        setOpen(false);
        setsnackbar(true);
        setStdOut(data.data);
      });
  };

  return loading ? (
    <>Loading</>
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Code compiled"
        />
        <Box sx={{ mt: 0.5 }}>
          <TextField
            margin="normal"
            label="User Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="user"
            focused
          />
          <Box
            sx={{
              minHeight: "65vh",
              display: "flex",
              justifyContent: "stretch",
              minWidth: "80vw",
              background: "#0f0a19",
              color: "gray",
            }}
          >
            <Box>
              <LanguageSelector language={language} onSelect={onSelect} />
              <Editor
                theme="vs-dark"
                height="65vh"
                width="55vw"
                value={code}
                language={language}
                defaultLanguage="cpp"
                defaultValue="// some comment"
                onChange={(value) => setCode(value)}
              />
            </Box>
            <Box
              sx={{
                margin: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <InputBox
                loading={open}
                output={stdOut}
                inp={stdIn}
                onInput={onInput}
                mode={mode}
                postCodes={onsubmit}
                compile={compileCode}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
