import { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const AuditContext = createContext();

export const AuditProvider = ({ children }) => {
  const [audits, setAudits] = useState(() => getLocalStorage('audit_history', []));
  const [correctiveActions, setCorrectiveActions] = useState(() => getLocalStorage('corrective_actions', []));

  useEffect(() => {
    setLocalStorage('audit_history', audits);
  }, [audits]);

  useEffect(() => {
    setLocalStorage('corrective_actions', correctiveActions);
  }, [correctiveActions]);

  const addAudit = (auditData) => {
    // Generate an audit score based on accuracy, damages, expiries
    let totalScore = 100;
    const actions = [];
    
    auditData.items.forEach(item => {
      const discrepancy = item.physicalQuantity - item.systemQuantity;
      if (Math.abs(discrepancy) > 0) totalScore -= 5;
      if (item.damaged > 0) totalScore -= 3;
      if (item.expired > 0) totalScore -= 2;

      // Auto-generate corrective actions
      if (discrepancy < 0) {
        actions.push({
          id: Date.now().toString() + Math.random().toString(),
          itemId: item.id,
          itemName: item.name,
          issue: `Shortage of ${Math.abs(discrepancy)} units`,
          status: 'Open',
          date: new Date().toISOString()
        });
      }
      if (item.damaged > 0) {
        actions.push({
          id: Date.now().toString() + Math.random().toString(),
          itemId: item.id,
          itemName: item.name,
          issue: `${item.damaged} damaged units found`,
          status: 'Open',
          date: new Date().toISOString()
        });
      }
    });

    const finalScore = Math.max(0, totalScore);
    const newAudit = { ...auditData, id: Date.now().toString(), score: finalScore, date: new Date().toISOString() };
    
    setAudits(prev => [newAudit, ...prev]);
    if (actions.length > 0) {
      setCorrectiveActions(prev => [...actions, ...prev]);
    }
  };

  const updateActionStatus = (actionId, status) => {
    setCorrectiveActions(prev => prev.map(a => a.id === actionId ? { ...a, status } : a));
  };

  return (
    <AuditContext.Provider value={{ audits, addAudit, correctiveActions, updateActionStatus }}>
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => useContext(AuditContext);
