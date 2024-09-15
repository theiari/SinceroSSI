<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
    <thead class="text-xs text-gray-900 uppercase bg-gray-800 dark:bg-gray-900 dark:text-gray-800 sticky top-0">
     <tr>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Issuer</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Type</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Created at</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Actions</th>
     </tr>
    </thead>
    <tbody v-for="credential in products" :key="credential.id"> 
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       <div class="truncate" style="max-width: 200px">{{ credential.data.issuer }}</div>
      </th>
      <td class="px-6 py-4">{{ credential.data.credentialSchema?.type }}</td>
      <td class="px-6 py-4">{{ formatDate(credential.data.issuanceDate)  }}</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <Dialog>
         <DialogTrigger>
          <Icon name="ant-design:eye-filled" size="20px" />
         </DialogTrigger>
         <DialogContent class="sm:max-w-[625px]">
          <DialogHeader>
           <DialogTitle>View Credential</DialogTitle>
           <DialogDescription>{{ credential.credentialSubject.data.extra }}</DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
           <div class="items-center gap-4">
            <div class="flex justify-center">
             <pre>{{ JSON.stringify(credential, null, 2) }}</pre>
            </div>
           </div>
          </div>
         </DialogContent>
        </Dialog>
        <AlertDialog>
         <AlertDialogTrigger as-child>
          <Icon name="ant-design:delete-outlined" size="20px" />
         </AlertDialogTrigger>
         <AlertDialogContent>
          <AlertDialogHeader>
           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
           <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the credential from the system.
           </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
         </AlertDialogContent>
        </AlertDialog>
       </a>
      </td>
     </tr>
    </tbody>
   </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Masca, enableMasca, isSuccess, type Result } from '@blockchain-lab-um/masca-connector';

const products = ref<any[]>([]);

const verifiableCredential = {
  "type": [
    "VerifiableCredential",
    "MascaUserCredential"
  ],
  "credentialSubject": {
    "id": "did:ethr:0x1:0xdc8f44de6d92e634b61de5e98a60ebba69544453",
    "type": "Regular User"
  },
  "issuer": "did:ethr:0x1:0x4f3f8f8b8f4f8f8f8f8f8f8f8f8f8f8f8f8f8f8f",
  "issuanceDate": new Date(),
  "credentialSchema": {
    "id": "https://beta.api.schemas.serto.id/v1/public/program-completion-certificate/1.0/json-schema.json",
    "type": "JsonSchemaValidator2018"
  },
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://beta.api.schemas.serto.id/v1/public/program-completion-certificate/1.0/ld-context.json"
  ]
};

function formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Optional: to use 24-hour format
      });
    }

onMounted(() => {
  if (typeof window.ethereum === 'undefined') {
    console.error('Ethereum provider (MetaMask) is not available');
    return;
  }
  

  

  window.ethereum.request({ method: "eth_requestAccounts",

   })
    .then((accounts: unknown) => {
      if (!Array.isArray(accounts) || accounts.length === 0) {
        throw new Error('No accounts returned from Ethereum provider');
      }
      const address = accounts[0];
      if (typeof address !== 'string') {
        throw new Error('Invalid address returned from Ethereum provider');
      }
      console.log('Ethereum Address:', address);

      return enableMasca(address, {
        snapId: 'npm:@blockchain-lab-um/masca',
        version: '1.2.2',
        supportedMethods: ['did:polygonid', 'did:pkh'],
      });
    })
    .then((enableResult: Result<Masca>) => {
      if (isSuccess(enableResult)) {
        const api = enableResult.data;
        console.log('Masca API:', api);
        const credentialString = JSON.stringify(verifiableCredential);
        return api.getMascaApi().saveCredential(credentialString, {
          store: 'snap',
        }).then(() => api.getMascaApi());
      } else {
        throw new Error('Error enabling Masca: ' + enableResult.error);
      }
    })
    .then((MascaApi) => {
      return MascaApi.queryCredentials();
    })
    .then((queryResult) => {
      if (isSuccess(queryResult)) {
        console.log('The queried credentials are the following:', queryResult.data);
        // console.log('The queried data of first credential is the following:', queryResult.data.);
        products.value = queryResult.data;
      } else {
        throw new Error('Error querying credentials: ' + queryResult.error);
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
});
</script>