import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/navbar";
import { AuthView } from "./views/auth";
import { CheckoutView } from "./views/checkout";
import { PerchasedItemsView } from "./views/perchased-items";
import { ShopView } from "./views/shop";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ShopView />}></Route>
                    <Route path="/auth" element={<AuthView />}></Route>
                    <Route path="/checkout" element={<CheckoutView />}></Route>
                    <Route
                        path="/perchased-items"
                        element={<PerchasedItemsView />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
