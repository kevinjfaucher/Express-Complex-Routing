import React, { useState } from 'react';
import axios from 'axios';

const SearchCharacters: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/characters/search?name=${query}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
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
        {results.map((char: any) => (
          <li key={char._id}>{char.name} - {char.class}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCharacters;
