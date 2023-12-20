import { useContext } from "react";

import { CartItem } from "./cart-item";

import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

import "./styles.css";

export const CheckoutView = () => {
    const { getCartItemCount } = useContext<IShopContext>(ShopContext);
    const { products } = useGetProducts();

    return (
        <div className="cart">
            <div className="cart-title">
                <h1>Your Cart Items</h1>
            </div>
            <div className="cart-body">
                {products.map((product: IProduct) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem product={product} />;
                    }
                })}
            </div>
        </div>
    );
};
