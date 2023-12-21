import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import { useGetToken } from "../hooks/useGetToken";

export interface IShopContext {
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    getCartItemCount: (itemId: string) => number;
    getTotalCartAmount: () => number;
    checkout: () => void;
    avaliableMoney: number;
}

const defaultValue: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: () => null,
    getCartItemCount: () => 0,
    getTotalCartAmount: () => 0,
    checkout: () => null,
    avaliableMoney: 0,
};

export const ShopContext = createContext<IShopContext>(defaultValue);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
    const [avaliableMoney, setAvaliableMoney] = useState<number>(0);

    const { products } = useGetProducts();
    const { headers } = useGetToken();
    const navigate = useNavigate();

    const fetchAvaliableMoney = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/user/avaliable-money/${localStorage.getItem(
                    "userID"
                )}`,
                { headers }
            );
            setAvaliableMoney(res.data.avaliableMoney);
        } catch (error) {
            alert("ERROR: Something went wrong.");
        }
    };

    const getCartItemCount = (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }
        return 0;
    };

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId: string) => {
        if (!cartItems[itemId]) return;
        if (cartItems[itemId] === 0) return;
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItemCount = (newAmount: number, itemId: string) => {
        if (newAmount < 0) return;
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    };

    const getTotalCartAmount = (): number => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo: IProduct = products.find(
                    (product) => product._id === item
                );
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    };

    const checkout = async () => {
        const body = { customerID: localStorage.getItem("userID"), cartItems };

        try {
            await axios.post("http://localhost:3001/products/checkout", body, {
                headers,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAvaliableMoney();
    }, []);

    const contextValue: IShopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        getTotalCartAmount,
        checkout,
        avaliableMoney,
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
