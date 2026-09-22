import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { useAudit } from '../context/AuditContext';

const NewAudit = () => {
  const { items } = useInventory();
  const { addAudit } = useAudit();
  const navigate = useNavigate();
  
  const [auditItems, setAuditItems] = useState(
    items.map(item => ({
      ...item,
      physicalQuantity: item.systemQuantity.toString(),
      damaged: '0',
      expired: '0'
    }))
  );
  
  const [error, setError] = useState('');

  const handleInputChange = (id, field, value) => {
    setAuditItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const processedItems = [];
    for (const item of auditItems) {
      const pQty = parseInt(item.physicalQuantity);
      const dam = parseInt(item.damaged);
      const exp = parseInt(item.expired);
      
      if (isNaN(pQty) || pQty < 0 || isNaN(dam) || dam < 0 || isNaN(exp) || exp < 0) {
        setError(`Please enter valid non-negative numbers for item: ${item.name}`);
        return;
      }
      
      if (dam + exp > pQty && pQty > 0) {
        setError(`Damaged and expired units cannot exceed total physical quantity for item: ${item.name}`);
        return;
      }
      
      processedItems.push({
        ...item,
        physicalQuantity: pQty,
        damaged: dam,
        expired: exp
      });
    }

    setError('');
    addAudit({ items: processedItems });
    navigate('/');
  };

  if (items.length === 0) {
    return <div>No items in catalog. Please add items before auditing.</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Perform New Audit</h1>
      
      <div className="glass-panel">
        {error && <div style={{ color: 'var(--accent-red)', marginBottom: '16px', fontWeight: 'bold' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: '800px', marginBottom: '24px' }}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>System Qty</th>
                  <th>Physical Qty</th>
                  <th>Damaged</th>
                  <th>Expired</th>
                </tr>
              </thead>
              <tbody>
                {auditItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.systemQuantity}</td>
                    <td>
                      <input 
                        type="number" 
                        min="0"
                        className="form-control"
                        style={{ padding: '8px' }}
                        value={item.physicalQuantity}
                        onChange={(e) => handleInputChange(item.id, 'physicalQuantity', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="0"
                        className="form-control"
                        style={{ padding: '8px' }}
                        value={item.damaged}
                        onChange={(e) => handleInputChange(item.id, 'damaged', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="0"
                        className="form-control"
                        style={{ padding: '8px' }}
                        value={item.expired}
                        onChange={(e) => handleInputChange(item.id, 'expired', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary">Submit Audit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAudit;
