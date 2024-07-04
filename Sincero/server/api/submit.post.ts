export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("process env:", process.env.NODE_ENV);
  // return body;
  return { message: "Received body: "+body};
})