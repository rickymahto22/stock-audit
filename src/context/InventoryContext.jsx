import { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const InventoryContext = createContext();

const initialInventory = [
  { id: '1', name: 'Premium Wireless Headphones', category: 'Electronics', systemQuantity: 50, price: 199.99 },
  { id: '2', name: 'Ergonomic Office Chair', category: 'Furniture', systemQuantity: 20, price: 299.99 },
  { id: '3', name: 'Mechanical Keyboard', category: 'Electronics', systemQuantity: 75, price: 129.99 },
];

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState(() => getLocalStorage('inventory_items', initialInventory));

  useEffect(() => {
    setLocalStorage('inventory_items', items);
  }, [items]);

  const addItem = (item) => {
    setItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updatedItem } : i));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
