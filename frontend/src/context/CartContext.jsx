import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../config/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const refresh = async () => {
    if (!user) {
      setItems([]);
      setSubtotal(0);
      return;
    }
    const json = await apiFetch('/api/cart');
    setItems(json.items);
    setSubtotal(json.subtotal);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addItem = async (product, color, qty = 1) => {
    const json = await apiFetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        color,
        qty
      })
    });
    setItems(json.items);
    setSubtotal(json.subtotal);
  };

  const updateQty = async (productId, qty) => {
    const json = await apiFetch(`/api/cart/${productId}`, { method: 'PATCH', body: JSON.stringify({ qty }) });
    setItems(json.items);
    setSubtotal(json.subtotal);
  };

  const removeItem = async (productId) => {
    const json = await apiFetch(`/api/cart/${productId}`, { method: 'DELETE' });
    setItems(json.items);
    setSubtotal(json.subtotal);
  };

  const clearCart = async () => {
    const json = await apiFetch('/api/cart', { method: 'DELETE' });
    setItems(json.items);
    setSubtotal(json.subtotal);
  };

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, subtotal, count, addItem, updateQty, removeItem, clearCart, refresh }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
