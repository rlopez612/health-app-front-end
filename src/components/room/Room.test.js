import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Room from './Room';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    id: 1
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Room user={{ role: 'manager' }} />, div);
});

test('Room renders correctly', () => {
  const tree = renderer
    .create(<Room user={{ role: 'manager' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
