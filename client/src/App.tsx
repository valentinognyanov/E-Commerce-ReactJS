import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/navbar";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/"></Route>
                    <Route path="/auth"></Route>
                    <Route path="/checkout"></Route>
                    <Route path="/perchased-items"></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
