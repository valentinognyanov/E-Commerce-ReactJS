import { useContext } from "react";

import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface Props {
    product: IProduct;
}

export const Product = (props: Props) => {
    const { _id, productName, description, price, stockQuantity, imageURL } =
        props.product;

    const { addToCart, getCartItemCount } =
        useContext<IShopContext>(ShopContext);

    const count = getCartItemCount(_id);

    return (
        <div className="product-wrapper">
            <figure>
                <img src={imageURL} alt="product-img" />
            </figure>
            <div className="product-body">
                <h3>{productName}</h3>
                <p>
                    {description.length > 100
                        ? description.substring(0, 95) + "..."
                        : description}
                </p>
                <p className="product-price">${price}</p>
            </div>

            <div className="stock-quantity">
                {stockQuantity === 0 ? (
                    <h1>OUT OF STOCK</h1>
                ) : (
                    <button
                        onClick={() => addToCart(_id)}
                        className="add-to-cart-btn"
                    >
                        Add to cart {count > 0 && <>({count})</>}
                    </button>
                )}
            </div>
        </div>
    );
};
