import { defineEventHandler, setCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  // Attempt to get the existing token (if any)
  const token = getCookie(event, '__session');

  if (!token) {
    // If no token is found, the user is already not authenticated
    throw createError({ statusCode: 400, statusMessage: 'No active session found' });
  }

  // Clear the session cookie by setting its expiration date in the past
  setCookie(event, '__session', '', {
    maxAge: 0, // Set the cookie to expire immediately
    path: '/',  // Ensure the cookie is removed for the entire site
  });

  // Optionally, you can include a response message
  return { message: 'Logged out successfully' };
});