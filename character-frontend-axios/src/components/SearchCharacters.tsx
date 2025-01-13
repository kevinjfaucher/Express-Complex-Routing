import React, { useState } from 'react';
import axios from 'axios';

interface Character {
  _id?: string;
  name: string;
  class: string;
  alignment: string;
}

const SearchCharacters: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Character[]>([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/characters/search?name=${query}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error('Error searching characters:', err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((char) => (
          <li key={char._id}>{char.name} - {char.class} - {char.alignment}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCharacters;
