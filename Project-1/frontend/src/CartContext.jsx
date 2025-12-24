import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Cart functions (same as before)
  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === book._id);
      if (existing) {
        return prev.map(item => 
          item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // Wishlist functions
  const toggleWishlist = (book) => {
    setWishlist(prev => {
      if (prev.find(item => item._id === book._id)) {
        return prev.filter(item => item._id !== book._id);
      }
      return [...prev, book];
    });
  };

  const isInWishlist = (id) => wishlist.some(item => item._id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}