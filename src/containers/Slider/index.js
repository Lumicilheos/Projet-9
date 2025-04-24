import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    if (byDateDesc.length === 0) return () => {};
    const id = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
    return () => clearInterval(id);
  }, [byDateDesc.length]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(nextCard, 5000);
    setIntervalId(id);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={`${event.id}test`}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((item, radioIdx) => (
                <input
                  key={item.id} // Assurez-vous qu'ici aussi, chaque item a un id unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => handleRadioChange(radioIdx)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
