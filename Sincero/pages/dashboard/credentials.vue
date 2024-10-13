<template>
 <a
  class="block mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
 >
  <div class="relative flex justify-between mb-1 items-center">
   <div class="flex items-center">
    <h5 class="text-2xl p-3 font-bold tracking-tight text-gray-900 dark:text-white">Verifiable Credentials</h5>
    <Toaster />
    <Dialog>
     <DialogTrigger>
      <Button class="flex items-center justify-center mx-2">
       New credential
       <Icon name="ant-design:plus-square-outlined" class="mx-0.5" size="24px" />
      </Button>
     </DialogTrigger>
     <DialogContent class="sm:max-w-[525px]">
      <DialogHeader>
       <DialogTitle>Create a new Verifiable Credential</DialogTitle>
       <DialogDescription> Please provide the necessary information </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
       <div class="items-center gap-4">
        <RadioGroup v-model="form.credentialSubject.certification" defaultValue="exam">
         <div class="flex justify-center">
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-one" value="exam" />
           <Label for="option-one">Exam</Label>
          </div>
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-two" value="degree" />
           <Label for="option-two">Degree</Label>
          </div>
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-three" value="multiple" />
           <Label for="option-three">Multiple</Label>
          </div>
         </div>
        </RadioGroup>
       </div>

       <div class="grid grid-cols-4 items-center gap-4 mr-5"></div>
       <div class="grid grid-cols-4 items-center gap-2">
        <Label for="title" class="col-span-1"> Title </Label>
        <Input id="title" v-model="form.credentialSubject.title" class="col-span-1" />
        <Label for="issuer" class="text-right col-span-1"> DID </Label>
        <Input id="issuer" v-model="form.issuer" class="col-span-1 truncate" disabled placeholder="myEthereumAddress" />
       </div>
       <div class="grid grid-cols-4 items-center gap-2">
        <Label for="grade" class="col-span-1"> Grade </Label>
        <Input id="grade" type="number" v-model="form.credentialSubject.grade" class="col-span-1" />
        <Label for="max-grade" class="text-right col-span-1"> Max grade </Label>
        <Input id="max-grade" type="number" v-model="form.credentialSubject.maxGrade" class="col-span-1" />
       </div>
      </div>
      <DialogClose as-child>
       <Button @click="onSubmit()">
        Create Verifiable Credential <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5" />
       </Button>
      </DialogClose>
     </DialogContent>
    </Dialog>
   </div>
  </div>

  <div :class="['relative', 'overflow-auto']" style="max-height: 300px">
   <!-- <div v-if="isLoading" class="space-y-4">
    <div v-for="i in 3" :key="i" class="animate-pulse">
     <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
     <div class="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
   </div> -->
   <myTable></myTable>
  </div>
 </a>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { required, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Masca, enableMasca, isSuccess, type Result } from "@blockchain-lab-um/masca-connector";
import type { VerifiableCredential } from "@veramo/core";
export type W3CVerifiableCredential = VerifiableCredential | string
export default {
 setup() {
  var credential: VerifiableCredential = {} as VerifiableCredential;
  const { toast } = useToast();
  // const isLoading = ref(true);
  const isDialogOpen = ref(false);

  // TODO CORRECT THE FORM FIELDS AND THEN CREATE A BLOCKCHAIN DATA SCHEMA FOR THE CREDENTIAL

  let form = reactive({
   // W3C standard fields
   "@context": ["https://www.w3.org/2018/credentials/v1"],
   type: ["VerifiableCredential", "ExamCredential"],

   // Issuer and issuance details
   issuer: "",
  issuanceDate: new Date().toISOString(),

   // CredentialSubject that holds the main attributes
   credentialSubject: {
    certification: "",
    title: "",
    grade: "",
    maxGrade: "",
   },

   // Credential schema details
   credentialSchema: {
    type: "",
    version: "0.1",
    ipfsLink: "ipfs://abc123", //TODO this should be a real link to the schema
    //maybe it's also possible to add smart contract explorer link
   },

   // Proof object (to be filled after signing the credential)
   proof: {
    type: "",
    jwt: "",
   },
  });
  const selectedValue = ref("5");

  onMounted(() => {
   console.log("Component mounted, starting to load credentials");
   loadCredentials();
  });

  const loadCredentials = async () => {
   console.log("Loading credentials...");
   if (typeof window.ethereum === "undefined") {
    console.error("Ethereum provider (MetaMask) is not available");
    // isLoading.value = false;
    toast({
     title: "Error",
     description: "Ethereum provider (MetaMask) is not available",
     variant: "destructive",
    });
    return;
   }

   try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!Array.isArray(accounts) || accounts.length === 0) {
     throw new Error("No accounts returned from Ethereum provider");
    }
    const address = accounts[0];
    if (typeof address !== "string") {
     throw new Error("Invalid address returned from Ethereum provider");
    }
    // Set the DID field with the current MetaMask address
    form.issuer = "did:ethr:" + address;
   } catch (error) {
    console.error("An error occurred:", error);
    toast({
     title: "Error",
     description: "Failed to load credentials. Please try again.",
     variant: "destructive",
    });
   } finally {
    console.log("Finished loading credentials");
    // isLoading.value = false;
   }
  };

  const openDialog = () => {
   isDialogOpen.value = true;
  };

  const onSubmit = async () => {
   const $v = useVuelidate(
    {
     form: {
      issuer: { required },
      credentialSubject: {
       title: { required },
       grade: { required, numeric },
       maxGrade: { required, numeric },
      },
     },
    },
    { form }
   );

   $v.value.$touch();
   if ($v.value.$invalid) {
    toast({
     title: "Error",
     description: "Please check the form fields and try again",
     variant: "destructive",
    });
    return;
   }

   try {
    const response = await $fetch("/api/createJWT_VC", {
     method: "POST",
     body: form,
     headers: {
      "Content-Type": "application/json",
     },
    });
    if (response && "jwt" in response) {
    
    // token.value = response.jwt as string; // Assign jwt to token
    credential = response.jwt as VerifiableCredential;
     console.log("the backend provided back this jwtVC:", credential);
    } else {
     console.log("JWT not found in the response");

    }

    if (response?.code === 200) {
     toast({
      title: "Success",
      description: "Data sent successfully",
      variant: "default",
     });
     isDialogOpen.value = false;
    } else {
     throw new Error("API returned non-200 status code");
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
       form.issuanceDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
       });
       form.proof.jwt = credential.jwt; // Assign the JWT to the proof object
      //  const credentialString:W3CVerifiableCredential = JSON.stringify(form); maybe this is not right
        const credentialString = JSON.stringify(credential);
       console.log("Credential is ready to be saved:", credentialString);
       return api
        .getMascaApi()
        .saveCredential(credentialString, {
         store: "snap",
        })
        .then(() => api.getMascaApi().verifyData({credential}));
      } else {
       throw new Error("Error enabling Masca: " + enableResult.error);
      }
     });
   } catch (error) {
    console.error("Error submitting form:", error);
    toast({
     title: "Something went wrong.",
     description: "Please check the fields and try again.",
     variant: "destructive",
    });
   }
  };

  return {
  //  isLoading,
   isDialogOpen,
   form,
   selectedValue,
   loadCredentials,
   openDialog,
   onSubmit,
  };
 },
};

definePageMeta({
 layout: "dashboard",
});
</script>
