import React from 'react';
import {
  render, screen, waitFor, fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { BrowserRouter, Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { rest, server } from '../../testServer';
import RoomTypes from './RoomTypes';

it('Renders the RoomTypes page', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <RoomTypes user={{ role: 'manager' }} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Fetches data from the API', async () => {
  render(<RoomTypes user={{ role: 'manager' }} />, { wrapper: BrowserRouter });
  const heading = screen.getByRole('heading');
  const roomDescription = await waitFor(() => screen.findByText('Double king non-smoking'));

  expect(heading).toHaveTextContent('Room Types');
  expect(roomDescription).toBeVisible();
});

it('Should display error message when there is a server error', async () => {
  // Override default server response from testServer.js to test 'sad path'
  server.use(
    rest.get('http://localhost:8080/room-types', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<RoomTypes user={{ role: 'manager' }} />, { wrapper: BrowserRouter });
  const errorMsg = await waitFor(() => screen.getByText('Oops something went wrong'));

  expect(errorMsg).toBeVisible();
  // Click button to close modal and remove error message
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  expect(screen.queryByText(errorMsg)).toBeNull();
});

it('should redirect to the create room type page when clicking on the create button', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RoomTypes user={{ role: 'manager' }} />
    </Router>
  );
  const button = screen.getByText('Create');
  fireEvent.click(button);

  expect(history.location.pathname).toBe('/room-types/create');
});

it('should redirect to edit room type page when clicking on the edit button', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RoomTypes user={{ role: 'manager' }} />
    </Router>
  );
  const buttons = await screen.findAllByRole('button', { name: /edit/i });
  fireEvent.click(buttons[0]);

  expect(buttons).toHaveLength(2);
  expect(history.location.pathname).toBe('/room-types/edit/1');
});
