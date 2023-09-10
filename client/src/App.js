// client/src/App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/home";
import { useState } from "react";

import Chat from "./pages/chat";
const socket = io.connect("http://localhost:4000");

function App() {
  const [userName, setuserName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userName={userName}
                setuserName={setuserName}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={userName} room={room} socket={socket} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
