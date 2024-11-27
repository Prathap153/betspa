import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CategoryList from './CategoryComponent/categoryList';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BillGenerateList from './BillGenerateComponent/billGenerate';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '70px', flexGrow: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/billgenerate" element={<BillGenerateList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
