import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  describe, test, expect, jest,
} from '@jest/globals';

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
    render(<Button icon="🚀" text="Launch" iconCustomClass="iconClass" textCustomClass="textClass" />);
    const iconElement = screen.getByText(/🚀/i);
    const textElement = screen.getByText(/launch/i);
    expect(iconElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
  test('renders button with custom test id', () => {
    const { getByTestId } = render(<Button data-testid="custom-button" />);
    expect(getByTestId('custom-button')).toBeInTheDocument();
  });
});
