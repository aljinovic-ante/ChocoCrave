import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Manufacturers from './components/manufacturers/manufacturers';
import ManufacturerDetails from './components/manufacturers/manufacturerDetails';
import EditManufacturer from './components/manufacturers/editManufacturer';
import RegisterForm from './components/auth/register';
import LoginForm from './components/auth/login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/privateRoute';
import AdminRoute from './components/auth/adminRoute';
import Navbar from './components/common/navbar';
import Users from './components/users/users';
import OnlyAdmins from './components/users/onlyAdmins';
import OnlyUsers from './components/users/onlyUsers';
import AddManufacturer from './components/manufacturers/addManufacturer';
import Chocolates from './components/chocolates/chocolates';
import ChocolateDetails from './components/chocolates/chocolateDetails';
import EditChocolate from './components/chocolates/editChocolate';
import AddChocolate from './components/chocolates/addChocolate';
import Favorites from './components/common/favorites';
import Cart from './components/common/cart';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chocolates />
              </PrivateRoute>
            }
          />
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
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route path="/only-admins" element={
            <PrivateRoute>
              <AdminRoute>
                <OnlyAdmins />
              </AdminRoute>
            </PrivateRoute>
          } />
          <Route path="/only-users" element={
            <PrivateRoute>
              <AdminRoute>
                <OnlyUsers />
              </ AdminRoute>
            </PrivateRoute>
            } />
          <Route
            path="/manufacturers/:id"
            element={
              <PrivateRoute>
                <ManufacturerDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/chocolates/:id"
            element={
              <PrivateRoute>
                <ChocolateDetails />
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
            path="/chocolates/edit/:id"
            element={
              <PrivateRoute>
                <EditChocolate />
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
          <Route
            path="/chocolates/add"
            element={
              <PrivateRoute>
                <AddChocolate />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites/:id"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/chocolates" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;