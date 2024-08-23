export const environment = {
  auth: {
    domain: 'dev-akfq2sll8bwukj1u.us.auth0.com',
    clientId: 'LnIxquR3zSHXyaN0gWaZCARNj3YAKET9',
    audience: '',
    apiUri: 'http://localhost:3000',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: ['http://localhost:3000/*'],
  },
};
