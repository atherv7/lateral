import './App.css';
import Home from './components/Home/Home'; 
import Main from './components/Main/Main'; 
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}
