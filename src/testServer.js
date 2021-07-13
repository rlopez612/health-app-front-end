import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Establish mock server for all endpoints with 'happy path' mock data
const server = setupServer(
  
  rest.get('http://localhost:8080/room-types', (req, res, ctx) => (
    res(ctx.json([
      {
        id: 1,
        name: 'Executive Suite',
        description: 'Full business suite with office',
        rate: 99.99,
        active: true
      },
      {
        id: 2,
        name: 'King Double',
        description: 'Double king non-smoking',
        rate: 149.99,
        active: true
      }
    ]))
  )),

  rest.get('http://localhost:8080/room-types/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id,
        name: 'Executive Suite',
        description: 'Full business suite with office',
        rate: 99.99,
        active: true
      })
    );
  }),

  rest.post('http://localhost:8080/room-types', (req, res, ctx) => res(ctx.json()))
);

// Establish requests interception layer before all tests.
beforeAll(() => server.listen());
// Reset handlers back to the server defaults above when overriding for sad path tests
afterEach(() => server.resetHandlers());
// Clean up after all tests are done, closing the mock server
afterAll(() => server.close());

export { rest, server };
