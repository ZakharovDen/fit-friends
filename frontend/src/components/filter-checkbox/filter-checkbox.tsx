import React from 'react';

interface ToggleOption {
  key: string;
  label: string;
}

interface FilterCheckboxProps {
  title: string;
  options: ToggleOption[];
  selectedKeys: string[];
  onChange: (key: string, checked: boolean) => void;
  className?: string;
}

function FilterCheckbox({
  title,
  options,
  selectedKeys,
  onChange,
  className = '',
}: FilterCheckboxProps): JSX.Element {
  const handleCheckboxChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(key, e.target.checked);
  };

  return (
    <div className={`user-catalog-formblock ${className}`}>
      <h4 className="user-catalog-form__block-title">{title}</h4>
      <ul className="user-catalog-form__check-list">
        {options.map(({ key, label }) => (
          <li className="user-catalog-form__check-list-item" key={key}>
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  value={key}
                  checked={selectedKeys.includes(key)}
                  onChange={handleCheckboxChange(key)}
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">{label}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCheckbox;