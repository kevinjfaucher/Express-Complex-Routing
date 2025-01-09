import React, { useState } from 'react';
import axios from 'axios';

const CharacterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [alignment, setAlignment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/characters', {
      name,
      class: characterClass,
      alignment,
    })
      .then((res) => {
        console.log('Character added:', res.data);
        setName('');
        setCharacterClass('');
        setAlignment('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Class:</label>
        <input
          type="text"
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
        />
      </div>
      <div>
        <label>Alignment:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
        />
      </div>
      <button type="submit">Add Character</button>
    </form>
  );
};

export default CharacterForm;
