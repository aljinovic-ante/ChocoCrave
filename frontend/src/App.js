import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Test from './components/test.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;