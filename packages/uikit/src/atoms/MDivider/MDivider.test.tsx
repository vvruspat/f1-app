import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MDivider from './MDivider';
import React from 'react';

describe('MDivider', () => {
  test('render card', async () => {
    const handleClick = jest.fn();

    render(<MDivider data-testid="divider" />);
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
});
