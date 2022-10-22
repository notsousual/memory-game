import { useEffect, useState } from "react";
import { images as sourceImages } from "./constants/images";
import { Card } from "./components/Card";
import { StateButton } from "./components/StateButton";
import { shuffleArray } from "./helpers/shuffleArray";

export const App = () => {
  const [cards, setCards] = useState(shuffleArray(sourceImages));
  const [guessed, setGuessed] = useState(new Set());
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [moves, setMoves] = useState(0);

  const [blocked, setBlocked] = useState(false);

  const [numbered, setNumbered] = useState(false);
  const [speed, setSpeed] = useState(2000);

  const [win, setWin] = useState(false);

  useEffect(() => {
    if (second !== undefined) {
      setBlocked(true);
      setMoves(moves + 1);

      setTimeout(() => {
        if (cards[first].url === cards[second].url) {
          setGuessed(guessed.add(first));
          setGuessed(guessed.add(second));
        }

        setCards(
          cards.map((x, key) => ({
            url: x.url,
            isActive: guessed.has(key) ? true : false,
          }))
        );

        if (guessed.size == cards.length) setWin(true);

        setFirst(undefined);
        setSecond(undefined);
        setBlocked(false);
      }, speed);
    }
  }, [first, second]);

  const handleClick = (id) => {
    if (!blocked) {
      setCards([
        ...cards.slice(0, id),
        { url: cards[id].url, isActive: true },
        ...cards.slice(id + 1, cards.length),
      ]);

      first !== undefined ? setSecond(id) : setFirst(id);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 20px" }}>
      <h1>Memory game</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Moves: {moves}</h2>

        {win && (
          <button
            onClick={() => {
              window.location.reload(false);
            }}
          >
            NEW GAME
          </button>
        )}
      </div>

      <div className="tiles">
        {cards.map((x, id) => (
          <Card
            key={id}
            cardId={id}
            url={x.url}
            isActive={x.isActive}
            onClick={() => {
              handleClick(id);
            }}
            numbered={numbered}
          />
        ))}
      </div>

      <div className="options">
        <div>
          <h3>Numbered cards:</h3>
          <div>
            <StateButton
              onClick={() => {
                setNumbered(true);
              }}
              state={numbered}
              targetValue={true}
              title={"ON"}
            />
            <StateButton
              onClick={() => {
                setNumbered(false);
              }}
              state={numbered}
              targetValue={false}
              title={"OFF"}
            />
          </div>
        </div>

        <div>
          <h3>Speed:</h3>
          <div>
            <StateButton
              onClick={() => {
                setSpeed(800);
              }}
              state={speed}
              targetValue={800}
              title={"FAST"}
            />

            <StateButton
              onClick={() => {
                setSpeed(1800);
              }}
              state={speed}
              targetValue={1800}
              title={"NORMAL"}
            />

            <StateButton
              onClick={() => {
                setSpeed(2500);
              }}
              state={speed}
              targetValue={2500}
              title={"SLOW"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
