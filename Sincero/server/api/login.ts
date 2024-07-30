import { defineEventHandler, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, '__session');
  console.log("the token is: ", token);

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token provided' });
  }

  return { token };
});