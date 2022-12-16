import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./component/Login";
import Home from "./component/Home";
import Add from "./component/Add";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<LogIn />} />
            <Route path='/home' element={<Home />} />
            <Route path='/add' element={<Add />} />
          </Routes>
        </div>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
