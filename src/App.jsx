import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DisplayPage from "./components/DisplayPage";

import InputPage from "./components/InputPage";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/:id" element={<InputPage mode="edit" />} />
          <Route
            path="/"
            element={
              <div>
                <InputPage mode="new" />
              </div>
            }
          />
          <Route path="/savedCodes" element={<DisplayPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
