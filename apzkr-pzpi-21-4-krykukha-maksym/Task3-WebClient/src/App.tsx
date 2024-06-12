import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { WatcherRoles } from './interfaces/enums';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DriverHeartbeat from './pages/DriverHeartbeat';
import Accident from './pages/Accident';
import DriverStatus from './pages/DriverStatus';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[WatcherRoles.Administrator]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[WatcherRoles.Watcher]} />}>
          <Route path="/driver-status" element={<DriverStatus />} />
          <Route path="/driver-heartbeat" element={<DriverHeartbeat/>} />
          <Route path="/accident" element={<Accident/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;