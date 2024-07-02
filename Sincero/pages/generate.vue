<template>
    <div class="flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-4xl font-bold mb-2 mt-2">Generate Public-Private Key Pair</h1>
      <h5 class="mb-3">(Using Ed25519)</h5>
      <button @click="generateKeys" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mb-2">Generate Keys</button>
      <div v-if="keys" class="w-3/4">
        <div class="mb-4">
          <label for="publicKey" class="block text-gray-700 text-sm font-bold mb-2">Public Key:</label>
          <textarea id="publicKey" v-model="keys.publicKey" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" rows="1" readonly></textarea>
        </div>
        <div>
          <label for="privateKey" class="block text-gray-700 text-sm font-bold mb-2">Private Key:</label>
          <textarea id="privateKey" v-model="keys.privateKey" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" rows="2" readonly></textarea>
        </div>
      </div>
      <div class="w-3/4 mt-8">
        <h2 class="text-2xl font-bold mb-4">Create DID</h2>
        <div class="mb-4">
          <label for="inputPublicKey" class="block text-gray-700 text-sm font-bold mb-2">Enter Public Key:</label>
          <textarea id="inputPublicKey" v-model="inputPublicKey" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" rows="1"></textarea>
        </div>
        <button @click="createDID" class=" mb-3 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600">Create DID</button>
        <div v-if="did" class="mt-4 mb-8 p-4 bg-white border border-gray-300 rounded-md">
          <p><strong>Generated DID:</strong> {{ did }}</p>
        </div>
      </div>
      <div class="w-3/4 mt-8">
        <h2 class="text-2xl font-bold mb-4">Create JWT</h2>
        <div class="mb-4">
          <button @click="createJWT" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create JWT</button>
        </div>
        <div v-if="jwt" class="mt-4 mb-8 p-4 ">
          <p><strong>Generated JWT:</strong></p>
          <textarea id="inputPublicKey" v-model="jwt" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" rows="3"></textarea>
        
          <button @click="sendJWT" class="mt-4 mr-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">Send JWT to Backend</button>
          <button @click="decodeJWT" class="mt-4 mr-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">Decode JWT</button> 
          <button @click="verifyJwt" class="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">Verify JWT</button> 
        </div>
      </div>
        <div v-if="decoded" class="w-3/4">
        <p><strong>decoded data:</strong></p>
        <textarea id="decodedJWT" v-model="decoded" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" rows="16"></textarea>
      </div>
      
    </div>
  </template>
  
  <script>
  const temp = await $fetch('/api/test');
  
function encodeHex(array) {
    return Array.from(array)
        .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
        .join('');
}

function decodeHex(hexString) {
    if (hexString.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }

    const byteArray = new Uint8Array(hexString.length / 2);
    
    for (let i = 0; i < hexString.length; i += 2) {
        byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }

    return byteArray;
}

  console.log(temp.hello);
  import tweetnacl from 'tweetnacl';
  import { encodeBase64, decodeBase64 } from 'tweetnacl-util';
  import { createJWT, EdDSASigner, decodeJWT } from 'did-jwt';
  export default {
    data() {
      return {
        keys: null,
        inputPublicKey: '',
        did: null,
        jwt: null,
        data: temp,
        decoded: null,
        payload64: null,
        signature64: null,
      };
    },
    methods: {
      generateKeys() {
        
        const keyPair = tweetnacl.sign.keyPair(); // Generate Ed25519 key pair
  
        const publicKey = encodeHex(keyPair.publicKey);
        const privateKey = encodeHex(keyPair.secretKey);
        this.keys = {
          publicKey,
          privateKey
        };
      },

      async decodeJWT(){
        this.decoded = JSON.stringify(decodeJWT(this.jwt), null, "\t");
        // console.log(JSON.stringify(this.decoded));
      },
    
      async verifyJwt() {
      try {
        const response = await fetch('/api/verify-jwt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpc3MiOiJkaWQ6dXBvcn....',
            audience: 'Your DID'
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          this.result = data;
        } else {
          this.error = data.error;
        }
      } catch (error) {
        this.error = error.message;
      }
    },


      createDID() {
        if (this.inputPublicKey) {
          this.did = `did:example:${this.inputPublicKey.slice(-16)}`;
        } else {
          alert('Please enter a public key');
        }
      },
      async createJWT() {
        if (!this.keys || !this.keys.privateKey) { //check if the keys are generated
          alert('Generate keys first.');
          return;
        }
  
        //const privateKey = encodeBase64(this.keys.privateKey); //TODO it expects to be 32 bytes, but it's 16 apparently...
        const signer = EdDSASigner(decodeHex(this.keys.privateKey)); // Use the first 32 bytes for the private key
        //console log privatekey length
        const payload = { example: 'JWT Data' }; // Payload for the JWT, right now it's just an example
        try {
          const jwt = await createJWT(
            payload,
            {
              issuer: this.did,
              signer,
              alg: 'EdDSA'
            }
          );
          this.jwt = jwt;
        } catch (err) {
          console.error('Error creating JWT:', err);
        }
      },
      async sendJWT() { //check if the jwt is valid or if there's something wrong
        if (!this.jwt || !this.keys || !this.keys.publicKey) {
          alert('Create a JWT and generate keys first.');
          return;
        }
  
        try { //send the jwt to the backend
          const response = await fetch('/api/verify-jwt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              jwt: this.jwt,
              publicKey: this.keys.publicKey
            })
          });
  
     
          if (response.ok) {
            alert(`JWT verified successfully. Payload: ${JSON.stringify(data.payload)}`);
          } else {
            alert(`Failed to verify JWT: ${data.error}`);
          }
        } catch (err) {
          console.error('Error sending JWT:', err);
          alert('Failed to send JWT');
        }
      },
      
      

    }
  };
  </script>
  
  <style scoped>
  textarea {
    resize: none;
  }
  </style>
  