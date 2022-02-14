/**
 * @name HttpHelper
 * @description
 * @param {string} route address to ping
 * @param {string} method http method
 * @param {string} payload object to send
 * @return
 */
export default (route, method, payload) => fetch(`http://localhost:8085${route}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  },
  body: JSON.stringify(payload)
});
