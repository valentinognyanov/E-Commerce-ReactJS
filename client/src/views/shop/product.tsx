import { IProduct } from "../../models/interfaces";

interface Props {
    product: IProduct;
}

export const Product = (props: Props) => {
    const { _id, productName, description, price, stockQuantity, imageURL } =
        props.product;
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
                    <button className="add-to-cart-btn">Add to cart</button>
                )}
            </div>
        </div>
    );
};
