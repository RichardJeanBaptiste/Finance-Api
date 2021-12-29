import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Home from './components/Home';
import Test from './components/Test';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/:fail" element={<Login failLogin={true}/>}/>
            <Route path="/admin/home/:username/:userId" element={<Home/>}/>
            <Route path="/test" element={<Test default={true}/>}/>
            <Route path="/test/:userId" element={<Test default={false}/>}/>
        </Routes>
    </div>
  );
}

export default App;
