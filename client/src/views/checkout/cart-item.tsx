import { useContext } from "react";

import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface Props {
    product: IProduct;
}

export const CartItem = (props: Props) => {
    const { _id, imageURL, price, productName } = props.product;
    const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
        useContext<IShopContext>(ShopContext);

    const cartItemCount = getCartItemCount(_id);
    return (
        <div className="cart-item">
            <div className="product-wrapper">
                <figure>
                    <img src={imageURL} alt="product-img" />
                </figure>
                <div className="product-body">
                    <h3>{productName}</h3>
                    <p className="product-price">Price: ${price}</p>
                </div>
                <div className="count-handler">
                    <button onClick={() => removeFromCart(_id)}> - </button>
                    <input
                        type="number"
                        value={cartItemCount}
                        onChange={(e) =>
                            updateCartItemCount(Number(e.target.value), _id)
                        }
                    />
                    <button onClick={() => addToCart(_id)}> + </button>
                </div>
            </div>
        </div>
    );
};
