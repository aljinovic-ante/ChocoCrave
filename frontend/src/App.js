import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Manufacturers from './components/manufacturers/manufacturers';
import ManufacturerDetails from './components/manufacturers/manufacturerDetails';
import EditManufacturer from './components/manufacturers/editManufacturer';
import RegisterForm from './components/auth/register';
import LoginForm from './components/auth/login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/privateRoute';
import Navbar from './components/common/navbar';
import Users from './components/users/users';
import AddManufacturer from './components/manufacturers/addManufacturer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/manufacturers"
            element={
              <PrivateRoute>
                <Manufacturers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/manufacturers/:id"
            element={
              <PrivateRoute>
                <ManufacturerDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/manufacturers/edit/:id"
            element={
              <PrivateRoute>
                <EditManufacturer />
              </PrivateRoute>
            }
          />
          <Route
            path="/manufacturers/add"
            element={
              <PrivateRoute>
                <AddManufacturer />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;