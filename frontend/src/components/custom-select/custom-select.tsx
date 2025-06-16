import { useState, useRef, useEffect } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  readonly?: boolean;
  placeholder?: string;
  className?: string;
};

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  readonly = false,
  placeholder = '',
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      className={`custom-select ${readonly ? 'custom-select--readonly' : ''} ${isOpen ? 'is-open' : ''} ${className}`}
    >
      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder" data-testid="custom-select-placeholder">
        {selectedOption?.label || placeholder}
      </div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={() => !readonly && setIsOpen(!isOpen)}
        disabled={readonly}
      >
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>

      {!readonly && isOpen && (
        <ul className={`custom-select__list ${isOpen && 'open-up'}`} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__item"
              role="option"
              aria-selected={value === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
