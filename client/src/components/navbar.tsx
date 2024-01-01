import { useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { IShopContext, ShopContext } from "../context/shop-context";

export const Navbar = () => {
    const { avaliableMoney, isAuthenticated, setIsAuthenticated } =
        useContext<IShopContext>(ShopContext);
    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1>E-Shop</h1>
            </div>
            <div className="navbar-links">
                {isAuthenticated && (
                    <>
                        <Link to="/">Shop</Link>
                        <Link to="/perchased-items">Perchased</Link>
                        <Link to="/checkout">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                        <Link to="/auth" onClick={logout}>
                            Logout
                        </Link>
                        <span>${avaliableMoney.toFixed(2)}</span>
                    </>
                )}
            </div>
        </div>
    );
};
