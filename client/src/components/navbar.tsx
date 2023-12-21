import { useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { IShopContext, ShopContext } from "../context/shop-context";

export const Navbar = () => {
    const { avaliableMoney } = useContext<IShopContext>(ShopContext);
    console.log(avaliableMoney);

    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1>E-Shop</h1>
            </div>
            <div className="navbar-links">
                <Link to="/">Shop</Link>
                <Link to="/perchased-items">Perchased</Link>
                <Link to="/checkout">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <span>${avaliableMoney.toFixed(2)}</span>
            </div>
        </div>
    );
};
