import './App.css';
import Home from './components/Home/Home'; 
import Main from './components/Main/Main'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
