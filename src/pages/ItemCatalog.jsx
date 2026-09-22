import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const ItemCatalog = () => {
  const { items, addItem, deleteItem } = useInventory();
  const [showForm, setShowForm] = useState(false);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({
      name,
      category,
      systemQuantity: parseInt(quantity),
      price: parseFloat(price)
    });
    setName('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Item Catalog</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Item'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Add New Inventory Item</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Item Name</label>
              <input required type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input required type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div className="form-group">
              <label>System Quantity</label>
              <input required type="number" min="0" className="form-control" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Unit Price ($)</label>
              <input required type="number" step="0.01" min="0" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1' }}>Save Item</button>
          </form>
        </div>
      )}

      <div className="glass-panel">
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No items in the catalog.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Expected Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.systemQuantity}</td>
                  <td>${item.price?.toFixed(2)}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => deleteItem(item.id)} style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ItemCatalog;
