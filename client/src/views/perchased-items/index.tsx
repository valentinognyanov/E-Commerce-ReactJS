import { useContext } from "react";

import { IShopContext, ShopContext } from "../../context/shop-context";

import "./styles.css";

export const PerchasedItemsView = () => {
    const { purchasedItems, addToCart, getCartItemCount } =
        useContext<IShopContext>(ShopContext);
    return (
        <div className="purchased-items-view">
            <div className="purchased-items-title">
                <h1>Previously Purchased Items</h1>
            </div>
            <div className="purchased-items">
                {purchasedItems.map((item) => {
                    const count = getCartItemCount(item._id);

                    return (
                        <div className="item" key={item._id}>
                            <div className="product-wrapper">
                                <h3>{item.productName}</h3>
                                <figure>
                                    <img
                                        src={item.imageURL}
                                        alt="purchased-item-img"
                                    />
                                </figure>
                                <p className="product-price">${item.price}</p>
                                <button onClick={() => addToCart(item._id)}>
                                    Purchase Again {count > 0 && <>({count})</>}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
