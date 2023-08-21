import React from 'react';
import { render } from '@testing-library/react-native';
import { StatusContext } from '../components/StatusContext.tsx';
import Complete from '../components/Complete';
import '@testing-library/jest-native/extend-expect';

describe('Complete component', () => {
  it('renders something', () => {
    const mockStatus = {
      complete: ['Goal1', 'Goal2']
    };

    const { getByText } = render(
      <StatusContext.Provider value={{ status: mockStatus, setStatus: jest.fn() }}>
        <Complete />
      </StatusContext.Provider>
    );
    getByText('Goal1');
    getByText('Goal2');
  });
});
