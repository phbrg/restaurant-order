// react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import './App.css';

// pages
import Home from './pages/Home'
import Menu from './pages/Menu';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
