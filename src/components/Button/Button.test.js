import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  test('renders Button with text', () => {
    // eslint-disable-next-line react/jsx-filename-extension
    render(<Button text="Click me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('Button click event', () => {
    const mockOnClick = jest.fn();
    render(<Button text="Click me" onClick={mockOnClick} />);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders Button with icon and text', () => {
    // Simulando a passagem de um ícone como um simples texto, ajuste conforme a implementação real do seu ícone
    render(<Button icon="🚀" text="Launch" iconCustomClass="iconClass" textCustomClass="textClass" />);
    const iconElement = screen.getByText(/🚀/i);
    const textElement = screen.getByText(/launch/i);
    expect(iconElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    // Você pode adicionar mais verificações aqui, por exemplo, classes aplicadas
  });

  // Adicione mais testes conforme necessário para cobrir variantes e tipos de botões
});

