import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import TeamPage from './pages/TeamPage';
import FacilityPage from './pages/FacilityPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AppointmentsPage from './pages/admin/AppointmentsPage';
import { UiPreferencesProvider } from './context/UiPreferencesContext';

export default function App() {
  return (
    <AuthProvider>
      <UiPreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="dich-vu" element={<ServicesPage />} />
              <Route path="dich-vu/:slug" element={<ServiceDetailPage />} />
              <Route path="doi-ngu" element={<TeamPage />} />
              <Route path="co-so" element={<FacilityPage />} />
              <Route path="dat-lich" element={<BookingPage />} />
            </Route>

            <Route path="admin/login" element={<LoginPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UiPreferencesProvider>
    </AuthProvider>
  );
}
