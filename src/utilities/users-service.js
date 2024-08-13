import tokenService from './token-service';
const BASE_URL = '/api/users/';

function signup(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.ok) return res.json();
            // Probably a duplicate email
            throw new Error(`Email already taken + ${res.status} !`);
        })
        // Parameter destructuring!
        .then(({ token }) => tokenService.setToken(token));
    // The above could have been written as
    //.then((token) => token.token);
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })
    .then(async (res) => {
      if (!res.ok) {
      
        const errorData = await res.json();
        const errorMessage = errorData.message || 'Login failed';
        console.error('Login Error Response:', errorData); // Log the detailed error
        throw new Error(errorMessage);
      }
      // Extract and return the response data
      const data = await res.json();
      return data;
    })
    .then(({ token }) => {
      if (token) {
        // Store the token using tokenService
        tokenService.setToken(token);
        return token;
      } else {
        throw new Error('No token received');
      }
    });
}

export default {
    signup,
    getUser,
    logout,
    login
};