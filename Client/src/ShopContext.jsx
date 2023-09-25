import { createContext, useState,useEffect } from "react";
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < 33; i++) {
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const addtoCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1,
        }));
    };
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1,
        }));
    };
 
    const contextValue = {
        addtoCart,
        removeFromCart,
        cartItems,
        setCartItems
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};