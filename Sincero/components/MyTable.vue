<template>
 <div class="container mx-auto p-4">
  <!-- Loading State -->
  <div v-if="isLoading" class="space-y-4">
   <div v-for="i in 3" :key="i" class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
   </div>
  </div>

  <!-- Data Table -->
  <table v-else class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
   <thead class="text-xs text-gray-900 uppercase bg-gray-800 dark:bg-gray-900 dark:text-gray-800 sticky top-0">
    <tr>
     <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Issuer</th>
     <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Type</th>
     <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Created at</th>
     <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Actions</th>
    </tr>
   </thead>
   <tbody>
    <tr
     v-for="credential in products"
     :key="credential.id"
     class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
     <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <div class="truncate" style="max-width: 200px">{{ credential.data.issuer.id }}</div>
     </th>
     <td class="px-6 py-4">{{ credential.data.credentialSubject.data.certification }}</td>
     <td class="px-6 py-4">{{ formatDate(credential.data.credentialSubject.issuanceDate) }}</td>
     <td class="px-8 py-4">
      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
       <!-- View Credential Dialog -->
       <Dialog>
        <DialogTrigger>
         <Icon name="ant-design:eye-filled" size="20px" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[825px] max-h-fit overflow-y-auto">
         <DialogHeader>
          <DialogTitle>View Credential</DialogTitle>
          <!-- <DialogDescription>{{ credential.credentialSubject.data.extra }}</DialogDescription> -->
         </DialogHeader>
         <div class="grid gap-4 py-4">
          <div class="flex justify-center">
           <div class="w-full">
            <!-- Create a scrollable container for JSON -->
            <pre class="p-2 bg-gray-100 rounded overflow-auto max-h-60 w-full">
            {{ JSON.stringify(credential, null, 2) }}
          </pre
            >
           </div>
          </div>
         </div>
        </DialogContent>
       </Dialog>

       <!-- Create Presentation Dialog -->
       <Dialog>
        <DialogTrigger @click="createVP(credential.data.vc)">
         <Icon name="ant-design:idcard-filled" size="20px" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[825px] max-h-fit overflow-y-auto">
         <DialogHeader>
          <DialogTitle>Create Presentation</DialogTitle>
          <!-- <DialogDescription>{{ credential.credentialSubject.data.extra }}</DialogDescription> -->
         </DialogHeader>
         <div class="grid gap-4 py-4">
          <div class="flex justify-center">
           <div class="w-full">something that needs a bit to be loaded</div>
          </div>
         </div>
        </DialogContent>
       </Dialog>

       <!-- Delete Credential AlertDialog -->
       <!-- <AlertDialog>
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
              </AlertDialog> -->
      </a>
     </td>
    </tr>
   </tbody>
  </table>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Masca, enableMasca, isSuccess, type Result } from "@blockchain-lab-um/masca-connector";
import { get } from "@vueuse/core";

// Reactive state
const products = ref<any[]>([]);
const isLoading = ref(true);

function createVP(credential: any) {
 //  console.log("this returns: ",createVerifiablePresentationJwt(credential, credential.issuer))
 console.log("this is what enters here: ", credential);
 // try {
 window.ethereum
  .request({ method: "eth_requestAccounts" })
  .then((accounts: unknown) => {
   if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error("No accounts returned from Ethereum provider");
   }
   const address = accounts[0];
   if (typeof address !== "string") {
    throw new Error("Invalid address returned from Ethereum provider");
   }
   console.log("Ethereum Address:", address);

   return enableMasca(address, {
    snapId: "npm:@blockchain-lab-um/masca",
    version: "1.2.2",
    supportedMethods: ["did:polygonid", "did:pkh"],
   });
  })
  .then(async (enableResult: Result<Masca>) => {
   if (isSuccess(enableResult)) {
    const api = enableResult.data;
    console.log("Masca API:", api);

    //  await api
    //     .getMascaApi()
    //     .createPresentation(credential);
    // return api.getMascaApi().createPresentation(credential);
    const reshapedCredential = {
     "@context": ["https://www.w3.org/2018/credentials/v1"],
     type: credential.type,
     credentialSubject: credential.credentialSubject,
     issuer: credential.issuer.id,
     issuanceDate: credential.vc.issuanceDate || new Date().toISOString(),
     proof: credential.vc.proof,
    };

    try {
      console.log("here the presentation of credential:", api.getMascaApi().createPresentation({
        vcs: [reshapedCredential],
        
      
    }));
    } catch (error) {
     console.error("Error creating presentation:", error);
    }
   } else {
    throw new Error("Error enabling Masca: " + enableResult.error);
   }
  });
 //  } catch (error) {
 //   console.error("Error submitting form:", error);
 //   toast({
 //    title: "Something went wrong.",
 //    description: "Please check the fields and try again.",
 //    variant: "destructive",
 //   });
 //  }
}
// Format date function
function formatDate(dateString: string): string {
 const date = new Date(dateString);
 return date.toLocaleString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
 });
}

// Load credentials on component mount
onMounted(() => {
 if (typeof window.ethereum === "undefined") {
  console.error("Ethereum provider (MetaMask) is not available");
  isLoading.value = false;
  return;
 }

 window.ethereum
  .request({ method: "eth_requestAccounts" })
  .then((accounts: unknown) => {
   if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error("No accounts returned from Ethereum provider");
   }
   const address = accounts[0];
   if (typeof address !== "string") {
    throw new Error("Invalid address returned from Ethereum provider");
   }
   console.log("Ethereum Address:", address);

   return enableMasca(address, {
    snapId: "npm:@blockchain-lab-um/masca",
    version: "1.2.2",
    supportedMethods: ["did:polygonid", "did:pkh"],
   });
  })
  .then((enableResult: Result<Masca>) => {
   if (isSuccess(enableResult)) {
    const api = enableResult.data;
    console.log("Masca API:", api);
    return api.getMascaApi();
   } else {
    throw new Error("Error enabling Masca: " + enableResult.error);
   }
  })
  .then((MascaApi) => {
   return MascaApi.queryCredentials();
  })
  .then((queryResult) => {
   if (isSuccess(queryResult)) {
    console.log("The queried credentials are the following:", queryResult.data);
    products.value = queryResult.data;
   } else {
    throw new Error("Error querying credentials: " + queryResult.error);
   }
  })
  .catch((error) => {
   console.error("An error occurred:", error);
  })
  .finally(() => {
   isLoading.value = false;
  });
});
</script>
