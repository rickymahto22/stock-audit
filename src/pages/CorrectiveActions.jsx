import { useAudit } from '../context/AuditContext';

const CorrectiveActions = () => {
  const { correctiveActions, updateActionStatus } = useAudit();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'var(--accent-red)';
      case 'In Progress': return 'orange';
      case 'Resolved': return 'var(--accent-green)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Corrective Actions</h1>
      
      <div className="glass-panel">
        {correctiveActions.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No corrective actions needed at this time.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {correctiveActions.map(action => (
                <tr key={action.id}>
                  <td>{new Date(action.date).toLocaleDateString()}</td>
                  <td>{action.itemName}</td>
                  <td>{action.issue}</td>
                  <td style={{ color: getStatusColor(action.status), fontWeight: 'bold' }}>
                    {action.status}
                  </td>
                  <td>
                    <select 
                      className="form-control" 
                      style={{ padding: '8px', width: 'auto' }}
                      value={action.status}
                      onChange={(e) => updateActionStatus(action.id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
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

export default CorrectiveActions;
