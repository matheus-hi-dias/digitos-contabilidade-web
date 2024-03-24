import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  describe, test, expect, jest,
} from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import ListItem from './index'; // Verifique se o caminho do arquivo está correto

describe('ListItem component', () => {
  test('renders list item with description', () => {
    const description = 'Example description';
    const { getByText } = render(<ListItem description={description} />);
    expect(getByText(description)).toBeInTheDocument();
  });

  test('calls seeAction when see button is clicked', () => {
    const seeActionMock = jest.fn();
    const { getByTestId } = render(<ListItem seeAction={seeActionMock} />);
    fireEvent.click(getByTestId('see-button'));
    expect(seeActionMock).toHaveBeenCalledTimes(1);
  });

  test('calls updateAction when update button is clicked', () => {
    const updateActionMock = jest.fn();
    const { getByTestId } = render(<ListItem updateAction={updateActionMock} />);
    fireEvent.click(getByTestId('update-button'));
    expect(updateActionMock).toHaveBeenCalledTimes(1);
  });

  test('calls deleteAction when delete button is clicked', () => {
    const deleteActionMock = jest.fn();
    const { getByTestId } = render(<ListItem deleteAction={deleteActionMock} />);
    fireEvent.click(getByTestId('delete-button'));
    expect(deleteActionMock).toHaveBeenCalledTimes(1);
  });
});
