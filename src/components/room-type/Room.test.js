import React from 'react';
import {
  render, screen, waitFor, fireEvent
} from '@testing-library/react';
import {
  Router, Route, MemoryRouter, BrowserRouter
} from 'react-router-dom';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { rest, server } from '../../testServer';
import Room from './RoomType';
import NotFound from '../not-found/NotFound';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Room user={{ role: 'manager' }} />
    </BrowserRouter>, div
  );
});

test('Room renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Room user={{ role: 'manager' }} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should redirect to reservations page when user is not a manager', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Room user={{ role: 'employee' }} />
    </Router>
  );

  expect(history.location.pathname).toBe('/reservations');
});

it('should redirect to NotFound page when server responds with 404 status', async () => {
  // Override default server response from testServer.js to test 'sad path'
  server.use(
    rest.get('http://localhost:8080/room-types/:id', (req, res, ctx) => res(ctx.status(404)))
  );

  render(
    <MemoryRouter initialEntries={['room-types/edit/10']}>
      <Route path="room-types/edit/:id">
        <Room user={{ role: 'manager' }} />
      </Route>
      <NotFound />
    </MemoryRouter>
  );

  const notFoundPage = await waitFor(() => screen.getByRole('heading'));
  expect(notFoundPage).toHaveTextContent('404 Page Not Found');
});

it('should display the edit form with values from server when id param included in url', async () => {
  render(
    <MemoryRouter initialEntries={['room-types/edit/1']}>
      <Route path="room-types/edit/:id">
        <Room user={{ role: 'manager' }} />
      </Route>
    </MemoryRouter>
  );

  const formTitle = screen.getByRole('heading');
  const roomDescription = await waitFor(() => screen.findByText('Full business suite with office'));

  expect(formTitle).toHaveTextContent('Edit Room Type');
  expect(roomDescription).toBeVisible();
});

it('should validate form fields', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Room user={{ role: 'manager' }} />
    </Router>
  );

  // submit form with blank fields
  fireEvent.submit(screen.getByRole('button'));

  expect(screen.getByText('Must be at least 3 characters')).toBeVisible();
  expect(screen.getByText('Must be number greater than zero')).toBeVisible();
  expect(history.location.pathname).not.toBe('/room-types');
});

it('should redirect to the room types page on successful post', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Room user={{ role: 'manager' }} />
    </Router>
  );

  fireEvent.input(screen.getByLabelText(/Room Type/i), {
    target: { value: 'Manager Special' }
  });

  fireEvent.input(screen.getByLabelText(/Description/i), {
    target: { value: 'Awesome room!' }
  });

  fireEvent.input(screen.getByLabelText(/Rate/i), {
    target: { value: 199.99 }
  });

  fireEvent.submit(screen.getByRole('button'));
  await waitFor(() => expect(history.location.pathname).toBe('/room-types'));
});

it('should display error message when there is a server error', async () => {
  // Override default server response from testServer.js to test 'sad path'
  server.use(
    rest.post('http://localhost:8080/room-types', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<Room user={{ role: 'manager' }} />, { wrapper: BrowserRouter });

  // Fill out the form fields with valid data
  fireEvent.input(screen.getByLabelText(/Room Type/i), {
    target: { value: 'Manager Special' }
  });

  fireEvent.input(screen.getByLabelText(/Description/i), {
    target: { value: 'Awesome room!' }
  });

  fireEvent.input(screen.getByLabelText(/Rate/i), {
    target: { value: 199.99 }
  });

  // Submit form with valid data
  fireEvent.submit(screen.getByRole('button'));

  await waitFor(() => expect(screen.getByText('Oops something went wrong')).toBeVisible());
  // Close modal and clear error
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  expect(screen.queryByText('Oops something went wrong')).toBeNull();
});
