import React from 'react';
import CharacterList from '../components/CharacterList';
import SearchCharacters from '../components/SearchCharacters';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Character List</h1>
      <SearchCharacters />
      <CharacterList />
    </div>
  );
};

export default Home;
