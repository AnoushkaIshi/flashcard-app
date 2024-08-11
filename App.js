import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(response => {
        console.log(response.data); // Check the data fetched from the backend
        setFlashcards(response.data);
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div>
      <h1>Flashcard Learning Tool</h1>
      {flashcards.length > 0 ? (
        <div>
          <div 
            onClick={handleFlip} 
            style={{
              border: '1px solid black',
              width: '300px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'lightgray'
            }}
          >
            {showAnswer ? currentCard.answer : currentCard.question}
          </div>
          <div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading flashcards...</p>
      )}
    </div>
  );
}

export default App;

