import { useAudit } from '../context/AuditContext';
import { useInventory } from '../context/InventoryContext';

const Dashboard = () => {
  const { audits, correctiveActions } = useAudit();
  const { items } = useInventory();

  const openActionsCount = correctiveActions.filter(a => a.status !== 'Resolved').length;
  
  // Calculate average score
  const avgScore = audits.length > 0 
    ? (audits.reduce((sum, a) => sum + a.score, 0) / audits.length).toFixed(1)
    : 'N/A';

  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--text-secondary)' }}>Average Audit Score</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)', marginTop: '12px' }}>
            {avgScore}
          </p>
        </div>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Items in Catalog</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-purple)', marginTop: '12px' }}>
            {items.length}
          </p>
        </div>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--text-secondary)' }}>Open Corrective Actions</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-red)', marginTop: '12px' }}>
            {openActionsCount}
          </p>
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ marginBottom: '16px' }}>Recent Audits</h2>
        {audits.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No audits performed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Score</th>
                <th>Items Audited</th>
              </tr>
            </thead>
            <tbody>
              {audits.slice(0, 5).map(audit => (
                <tr key={audit.id}>
                  <td>{new Date(audit.date).toLocaleDateString()}</td>
                  <td style={{ color: audit.score >= 90 ? 'var(--accent-green)' : audit.score >= 70 ? 'orange' : 'var(--accent-red)', fontWeight: 'bold' }}>
                    {audit.score}
                  </td>
                  <td>{audit.items?.length || 0} items</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
