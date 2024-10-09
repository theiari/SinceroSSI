import { promises as fs } from 'fs';
const noncesPath = "../Sincero/server/api/nonces/nonces.json"; 
type AddressNonceMap = {
  [address: string]: number;
};

//two clients try to login using the same nonce
//one client gets the nonce and logs in
//the other client tries to login with the same nonce
//the server should invalidate the nonce after the first client logs in
// async function differentNonce(target:string, generatedNonce:number): Promise<boolean> {
//   try {
//     // Read the file
//     const jsonData = await fs.readFile(noncesPath, 'utf8');

//     // Parse the JSON string into an object
//     const data: AddressNonceMap = JSON.parse(jsonData);

//     if (target in data) { //we need to check if the address has already a nonce
//       return (data[target] !==  generatedNonce); //if the nonce is different from the one generated, return true
//     } else {      //address not found in the JSON data so it needs a new nonce
//       return true;    
//     }
//   }
//   catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Failed to read or parse the file: ${error.message}`);
//     } else {
//       throw new Error('An unknown error occurred');
//     }
// }
// }



export default defineEventHandler(async (event) => {
  
 // Read the request body

 const { address} = await readBody(event);
   let nonceStore: { [key: string]: any } = {};
   const seed = Math.floor(Math.random() * 1000000000);
  //  let result = await differentNonce(address, seed);
  //  if (!result) {
  //   throw new Error("Invalid nonce");
  //  }
   nonceStore[address] = seed;
 // Load existing nonces from file
 try {
  console.log("Successfully read from the file:", nonceStore);
  console.log("this was the seed: ", seed);
   await fs.writeFile(noncesPath, JSON.stringify(nonceStore, null, 2)); 
   console.log("Successfully wrote to the file:", nonceStore);
   return { seed };
 } catch (error) {
   console.error("Error writing to file:", error);
 }

//  const seed = (useRuntimeConfig() as any).public.signatureNonce + Math.floor(Math.random() * 1000000);
//  await fs.writeFile(noncesPath, JSON.stringify(nonceStore, null, 2));

 // Check if the nonce matches
//  if (nonceStore[address] === seed) {
//     // Valid nonce
//     delete nonceStore[address]; // Invalidate nonce after use
//     await fs.writeFile(noncesPath, JSON.stringify(nonceStore, null, 2)); // Update the file
//     return { seed };
//  }
//  else
//     throw new Error("Invalid nonce");
  

 

});
