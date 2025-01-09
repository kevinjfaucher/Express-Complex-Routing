import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home'
import AddCharacter from './Pages/AddCharacter';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add-character">Add Character</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-character" element={<AddCharacter />} />
      </Routes>
    </div>
  );
};

export default App;
