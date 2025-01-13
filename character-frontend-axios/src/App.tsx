import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddCharacter from './pages/AddCharacter';
import EditCharacter from './pages/EditCharacter';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/add-character">Add Character</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-character" element={<AddCharacter />} />
        <Route path="/edit-character/:id" element={<EditCharacter />} />
      </Routes>
    </div>
  );
};

export default App;
