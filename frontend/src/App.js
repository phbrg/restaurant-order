// react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import './App.css';

// pages
import Home from './pages/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
