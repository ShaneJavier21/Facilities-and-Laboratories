import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { FacilitiesList } from './components/Facilities/FacilitiesList';
import { ReservationsList } from './components/Reservations/ReservationsList';
import { EquipmentList } from './components/Equipment/EquipmentList';
import { MaintenanceList } from './components/Maintenance/MaintenanceList';
import { ServicesList } from './components/Services/ServicesList';
import { AdminAffairs } from './components/AdminAffairs/AdminAffairs';
import { Reports } from './components/Reports/Reports';
import { Settings } from './components/Settings/Settings';
import { MyRequests } from './components/MyRequests/MyRequests';
import { TransportationList } from './components/Transportation/TransportationList';

function App() {
  const { user, signOut } = useAuth();

  return (
    <AuthGuard>
      <Router>
        <Routes>
          <Route path="/" element={<Layout user={user!} onLogout={signOut} />}>
            <Route index element={<Dashboard />} />
            <Route path="my-requests" element={<MyRequests />} />
            <Route path="facilities" element={<FacilitiesList />} />
            <Route path="reservations" element={<ReservationsList />} />
            <Route path="equipment" element={<EquipmentList />} />
            <Route path="maintenance" element={<MaintenanceList />} />
            <Route path="services" element={<ServicesList />} />
            <Route path="transportation" element={<TransportationList />} />
            <Route path="admin-affairs" element={<AdminAffairs />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthGuard>
  );
}

export default App;