import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Test from './components/test';
import RegisterForm from './components/auth/register';
import LoginForm from './components/auth/login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/privateRoute';
import Navbar from './components/common/navbar';

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
                <Test />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;