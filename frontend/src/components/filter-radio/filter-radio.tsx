import React from 'react';

interface ToggleOption {
  key: string;
  label: string;
}

interface FilterRadioProps {
  title: string;
  options: ToggleOption[];
  selectedKey: string;
  onChange: (key: string, checked: boolean) => void;
  className?: string;
}

function FilterRadio({
  title,
  options,
  selectedKey,
  onChange,
  className = '',
}: FilterRadioProps): JSX.Element {
  const handleCheckboxChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(key, e.target.checked);
  };

  return (
    <div className={`user-catalog-form__block ${className}`}>
      <h4 className="user-catalog-form__block-title">{title}</h4>
      <div className="custom-toggle-radio">
        {options.map(({ key, label }) => (
          <div className="custom-toggle-radio__block" key={key}>
            <label>
              <input 
                type="radio" 
                name="user-agreement"
                value={key}
                checked={key === selectedKey}
                onChange={handleCheckboxChange(key)}
              />
              <span className="custom-toggle-radio__icon"></span>
              <span className="custom-toggle-radio__label">{label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterRadio;