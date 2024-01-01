import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import { IShopContext, ShopContext } from "../../context/shop-context";

import "./styles.css";

export const ShopView = () => {
    const { products } = useGetProducts();
    const { isAuthenticated } = useContext<IShopContext>(ShopContext);

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return (
        <div className="shop">
            <div className="products">
                {products.map((product) => (
                    <div className="products-cards-body" key={product._id}>
                        <Product product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};
