export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Received body:", body);
  return body;
})