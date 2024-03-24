import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput from './index';

describe('TextInput component', () => {
  test('renders input with placeholder', () => {
    const { getByPlaceholderText } = render(<TextInput />);
    expect(getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
  });

  test('renders input with search icon', () => {
    const { getByTestId } = render(<TextInput />);
    expect(getByTestId('search-icon')).toBeInTheDocument();
  });

  test('input value changes when typing', () => {
    const { getByPlaceholderText } = render(<TextInput />);
    const input = getByPlaceholderText('Pesquisar...');
    fireEvent.change(input, { target: { value: 'Teste' } });
    expect(input.value).toBe('Teste');
  });
});
