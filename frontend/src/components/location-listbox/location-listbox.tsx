import { useEffect, useRef, useState } from "react";
import { UserLocation } from "../../types/user/user-location.enum";

type LocationListBoxProps = {
  selectedLocation: UserLocation | undefined,
  onSelectLocation: (location: UserLocation) => void;
}

function LocationListBox({onSelectLocation, selectedLocation}: LocationListBoxProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const handleLocationSelect = (location: UserLocation) => {
    onSelectLocation(location);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={`custom-select ${isOpen ? 'is-open ' : ''}${selectedLocation ? 'not-empty ' : ''}`} 
      ref={comboboxRef}
    >
      <span className="custom-select__label">Ваша локация</span>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select__text">{selectedLocation}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.entries(UserLocation).map(([key, location]) => (
          <li
            className="custom-select__item"
            key={key}
            role="option"
            aria-selected={selectedLocation === location}
            onClick={() => handleLocationSelect(location)}
            style={{ cursor: 'pointer' }}
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationListBox;