import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Character {
  _id?: string;
  name: string;
  class: string;
  alignment: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/characters')
      .then((res) => setCharacters(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteCharacter = (id: string) => {
    axios.delete(`http://localhost:3000/api/characters/${id}`)
      .then(() => setCharacters(characters.filter((char) => char._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <ul>
      {characters.map((char) => (
        <li key={char._id}>
          {char.name} - {char.class} - {char.alignment} 
          <button onClick={() => deleteCharacter(char._id!)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
