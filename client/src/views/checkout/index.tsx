import { useContext } from "react";
import { useNavigate } from "react-router";

import { CartItem } from "./cart-item";

import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

import { useGetProducts } from "../../hooks/useGetProducts";

import "./styles.css";

export const CheckoutView = () => {
    const { getCartItemCount, getTotalCartAmount, checkout } =
        useContext<IShopContext>(ShopContext);
    const { products } = useGetProducts();
    const navigate = useNavigate();

    const totalAmount = getTotalCartAmount();

    return (
        <div className="cart">
            <div className="cart-title">
                <h1>Your Cart Items</h1>
            </div>
            <div className="cart-body">
                {products.map((product: IProduct) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem key={product._id} product={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Total price: ${totalAmount.toFixed(2)}</p>
                    <button onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                    <button onClick={checkout}>Checkout</button>
                </div>
            ) : (
                <h2 className="empty-shopping-cart">
                    Your shopping cart is empty.
                </h2>
            )}
        </div>
    );
};
