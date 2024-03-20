import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LangSelector";
import InputBox from "./InputBox";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";

export default function InputPage({ mode }) {
  let { id } = useParams();
  

  const [user, setUser] = React.useState("");
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("cpp");
  const [stdIn, setStdIn] = React.useState("");
  const [stdOut, setStdOut] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      axios.get(`http://localhost:4000/genral/${id}`).then(({ data }) => {
        setLoading(false);
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
  }, []);

  const onSelect = (language) => {
    setLanguage(language);
  };

  const onInput = (inp) => {
    setStdIn(inp);
  };

  const onsubmit = () => {
    if (!user) {
      alert("Enter User Name");
    } else {
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
        });
    }
  };

  return loading ? (
    <>Loading</>
  ) : (
    <Container component="main" maxWidth="xs">
    
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 1 }}>
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
              minHeight: "70vh",
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
                postCodes={onsubmit}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
