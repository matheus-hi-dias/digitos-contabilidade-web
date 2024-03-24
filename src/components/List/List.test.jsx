import React from 'react';
import { render } from '@testing-library/react';
import {
  describe, test, expect,
} from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

import List from './index';

describe('List component', () => {
  test('renders list with children', () => {
    const { getByTestId } = render(
      <List containerClassName="custom-container">
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </List>,
    );

    expect(getByTestId('child1')).toBeInTheDocument();
    expect(getByTestId('child2')).toBeInTheDocument();
  });

  test('renders list with correct container class', () => {
    const { container } = render(<List containerClassName="custom-container" />);
    expect(container.firstChild).toHaveClass('itemListComponentClass');
    expect(container.firstChild).toHaveClass('custom-container');
  });
});
