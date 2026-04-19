import { createContext, useContext, useState, ReactNode } from 'react';
import { Anomaly } from '../types/Anomaly';

interface AnomalyContextType {
  anomalies: Anomaly[];
  addAnomaly: (anomaly: Anomaly) => void;
}

const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

export function AnomalyProvider({ children }: { children: ReactNode }) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  function addAnomaly(anomaly: Anomaly) {
    setAnomalies((prev) => [anomaly, ...prev]);
  }

  return (
    <AnomalyContext.Provider value={{ anomalies, addAnomaly }}>
      {children}
    </AnomalyContext.Provider>
  );
}

export function useAnomalies() {
  const context = useContext(AnomalyContext);
  if (!context) {
    throw new Error('useAnomalies must be used within AnomalyProvider');
  }
  return context;
}
