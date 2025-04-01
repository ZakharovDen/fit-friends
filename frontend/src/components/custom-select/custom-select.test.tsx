import { render, screen, fireEvent, within } from '@testing-library/react';
import { CustomSelect } from './custom-select';
import React from 'react';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const ParentComponent: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  const handleSelectChange = (newValue: string) => {
    setSelectedValue(newValue);
  };

  return (
    <div>
      <CustomSelect
        label="Test Label"
        options={mockOptions}
        value={selectedValue}
        onChange={handleSelectChange}
      />
      <span data-testid="selected-value">{selectedValue}</span>
    </div>
  );
};

describe('CustomSelect Component', () => {
  it('renders the label correctly', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the placeholder correctly when no value is selected', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders the selected option label correctly', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('opens the dropdown when the button is clicked', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument(); // Check if an option is visible
  });

  it('updates the selected value in the parent component when an option is selected', async () => {
    const { container } = render(<ParentComponent />);

    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    const selectedValueElement = await screen.findByTestId('selected-value');
    expect(selectedValueElement).toHaveTextContent('option1');
  });

  it('calls onChange with the correct value when an option is selected', () => {
    const onChange = vi.fn();
    render(<CustomSelect label="Test Label" options={mockOptions} onChange={onChange} />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);
    const option = screen.getByText('Option 2');
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('option2');
  });
  it('closes the dropdown when clicking outside the component', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body); // Simulate a click outside
    expect(screen.queryByText('Option 1')).toBeNull(); // Expect dropdown to close
  });

  it('does not open the dropdown when readonly is true', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} readonly />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);
    expect(screen.queryByText('Option 1')).toBeNull(); // Dropdown should not open
  });

  it('applies the className correctly', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} className="test-class" />);
    const selectDiv = screen.getByText('Test Label').closest('div');
    expect(selectDiv).toHaveClass('test-class');
  });

  it('button is disabled when readonly is true', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} readonly />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    expect(button).toBeDisabled();
  });

  it('renders correct aria-selected attribute', () => {
    render(<CustomSelect label="Test Label" options={mockOptions} value="option2" />);
    const button = screen.getByRole('button', { name: 'Выберите одну из опций' });
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox'); // Находим список опций
    const option1 = within(listbox).getByText('Option 1'); // Ищем внутри списка
    const option2 = within(listbox).getByText('Option 2');
    const option3 = within(listbox).getByText('Option 3');

    expect(option1).toHaveAttribute('aria-selected', 'false');
    expect(option2).toHaveAttribute('aria-selected', 'true');
    expect(option3).toHaveAttribute('aria-selected', 'false');
  });
});