import { useGetProducts } from "../../hooks/useGetProducts";

import { Product } from "./product";
import "./styles.css";

export const ShopView = () => {
    const { products } = useGetProducts();
    return (
        <div className="shop">
            <div className="products">
                {products.map((product) => (
                    <div>
                        <Product product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};
