import { useEffect } from "react";

enum Rating {
  Min = 1,
  Max = 5
}

type PopupFeedbackProps = {
  isVisible: boolean;
  onClose: () => void;
  onChange?: () => void;
}

function PopupFeedback({ isVisible, onClose, onChange }: PopupFeedbackProps): JSX.Element | null {
  
  const items: JSX.Element[] = [];
  for (let i = Rating.Min; i < Rating.Max + 1; i++) {
    items.push(
      <li className="popup__rate-item" key={i}>
        <div className="popup__rate-item-wrap" key={i}>
          <label>
            <input 
              type="radio" 
              name="оценка тренировки" 
              aria-label={`оценка ${i}.`} 
              value={i}
              onChange={onChange}
            /><span className="popup__rate-number">{i}</span>
          </label>
        </div>
      </li>
    );    
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible){
    return null;
  }
  return (
    <main>
      <div className="popup-form popup-form--feedback">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Оставить отзыв</h2>
              <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--feedback">
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <ul className="popup__rate-list">
                {items}
              </ul>
              <div className="popup__feedback">
                <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label>
                      <textarea name="description" placeholder=" "></textarea>
                    </label>
                  </div>
                </div>
              </div>
              <div className="popup__button">
                <button className="btn" type="button">Продолжить</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupFeedback;