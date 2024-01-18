import React, { useState, useEffect } from "react";

export const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );
        const data = await response.json();

        setCharacters((prevCharacters) => {
          if (currentPage === 1) {
            return data.results;
          } else {
            return [...prevCharacters, ...data.results];
          }
        });
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="container">
      <div className="characters">
        {characters.map((character) => (
          <div key={character.id} onClick={() => handleCardClick(character)}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <div className="toClose">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <div className="info">
              <p>{selectedCharacter.name}</p>
              <p>{selectedCharacter.gender}</p>
              <p>{selectedCharacter.status}</p>
              <p>{selectedCharacter.species}</p>
              <p>{selectedCharacter.type}</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Далее</button>
    </div>
  );
};
