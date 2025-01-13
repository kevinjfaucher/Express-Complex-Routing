import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCharacterForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [alignment, setAlignment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/characters/${id}`)
      .then((res) => {
        setName(res.data.name);
        setCharacterClass(res.data.class);
        setAlignment(res.data.alignment);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/characters/${id}`, {
      name,
      class: characterClass,
      alignment,
    })
      .then(() => navigate('/'))
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
      <button type="submit">Update Character</button>
    </form>
  );
};

export default EditCharacterForm;
