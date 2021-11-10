import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
