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
      physicalQuantity: item.systemQuantity,
      damaged: 0,
      expired: 0
    }))
  );

  const handleInputChange = (id, field, value) => {
    setAuditItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAudit({ items: auditItems });
    navigate('/');
  };

  if (items.length === 0) {
    return <div>No items in catalog. Please add items before auditing.</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Perform New Audit</h1>
      
      <div className="glass-panel">
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
