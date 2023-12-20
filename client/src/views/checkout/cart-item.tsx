import { IProduct } from "../../models/interfaces";

interface Props {
    product: IProduct;
}

export const CartItem = (props: Props) => {
    const { _id, imageURL, price, productName } = props.product;

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
                
            </div>
        </div>
    );
};
