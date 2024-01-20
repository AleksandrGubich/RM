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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
            <div className="coontent_inner">
              <img src={selectedCharacter.image} alt={selectedCharacter.name} />
              <div className="info">
                <p>
                  <span>Name: </span>
                  {selectedCharacter.name}
                </p>
                <p>
                  <span>Gender: </span>
                  {selectedCharacter.gender}
                </p>
                <p>
                  <span>Status: </span>
                  {selectedCharacter.status}
                </p>
                <p>
                  <span>Species: </span>
                  {selectedCharacter.species}
                </p>
                <p>
                  <span>Type: </span>
                  {selectedCharacter.type || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="next_page"
      >
        Next
      </button>
      {currentPage > 0 && (
        <button onClick={scrollToTop} className="to_top">
          To top
        </button>
      )}
    </div>
  );
};
