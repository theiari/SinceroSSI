<script language="ts">
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuLabel,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toast/use-toast";
import { required, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
 data() {
  return {
   form: {
    title: "",
    grade: "",
    maxGrade: "",
    DID: "",
   },
  };
 },
 validations() {
return {
   form: {
    title: { required },
    grade: { required, numeric },
    maxGrade: { required, numeric },
    DID: { numeric},
   }
  }

 },
 methods: {
  clicked() {
   console.log("clicked");
  },
  async onSubmit() {
    const $v = useVuelidate(this.validation(), this.form);
    console.log("plain $v", $v);

   console.log("Form submitted:", this.form);
  //  if (this.v$.$invalid) {
  //   alert("Please correct the errors in the form");
  //   return;
  //  }
  //  console.log("Form submitted:", this.form);
  //make a post request to the server passing the form data
  const data = await $fetch('/api/createJWT_VC', {
    method: 'POST',
    body: this.form,
      headers: {
        'Content-Type': 'application/json'
      },
  }).then((res) => {
    console.log(res);
  });
  },
  

  validation(){
    return {
      form: {
        title: { required },
        grade: { required, numeric },
        maxGrade: { required, numeric },
        DID: { numeric},
      }
    }
  }


 },
};

definePageMeta({
 layout: "dashboard",
});
</script>
<template>
 <a
  class="block mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
 >
  <div class="relative flex justify-between mb-1 items-center">
   <div class="flex items-center">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-5">Credentials</h5>

    <Dialog>
     <DialogTrigger>
      <Button class="flex items-center justify-center mx-2">
       New credential
       <Icon name="ant-design:plus-square-outlined" class="mx-0.5" size="24px" />
      </Button>
     </DialogTrigger>
     <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
       <DialogTitle>Create a new credential</DialogTitle>
       <DialogDescription>
        In this tab it's possible to create a new invitation to connect two, or multiple nodes.
       </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
       <div class="items-center gap-4">
        <RadioGroup defaultValue="option-one">
         <div class="flex justify-center">
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-one" value="option-one" />
           <Label for="option-one">Exam</Label>
          </div>
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-two" value="option-two" />
           <Label for="option-two">Degree</Label>
          </div>
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-three" value="option-three" />
           <Label for="option-three">Multiple</Label>
          </div>
         </div>
        </RadioGroup>
       </div>

       <!-- <Label for="title" class="text-right"> Title </Label>
  <Input id="title" class="col-span-2"  /> -->
       <div class="grid grid-cols-4 items-center gap-4 mr-5">
        <!-- <FormKit
         name="title"
         label="Title"
         validation="required|length:3|"
         validation-visibility="live"
         :classes="{
          outer: {
            'my-button': true
          },
          input: {
            $reset: true
          }
        }"
        /> -->
        <!-- <pre wrap>{{ value }}</pre> -->
       </div>
       <div class="grid grid-cols-4 items-center gap-2">
        <Label for="title" class="col-span-1"> Title </Label>
        <Input id="title" v-model="form.title" class="col-span-1" />
        <Label for="max-grade" class="text-right col-span-1"> ?DID? </Label>
        <Input id="max-grade" v-model="form.DID" class="col-span-1" />
       </div>
       <div class="grid grid-cols-4 items-center gap-2">
        <Label for="grade" class="col-span-1"> Grade </Label>
        <Input id="grade" v-model="form.grade" class="col-span-1" />
        <Label for="max-grade" class="text-right col-span-1"> Max grade </Label>
        <Input id="max-grade" v-model="form.maxGrade" class="col-span-1" />
       </div>
      </div>
      <DialogClose as-child>

      <Button @click="onSubmit()">
       Create Verifiable Credential <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5" />
      </Button>
      </DialogClose>
     </DialogContent>
    </Dialog>

    <DropdownMenu class="mx-2 flex items-end">
     <DropdownMenuTrigger as-child>
      <Button variant="outline">
       {{ selectedValue }}
       <Icon name="ant-design:down-outlined" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent class="w-18">
      <DropdownMenuRadioGroup v-model="selectedValue">
       <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
       <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
       <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
     </DropdownMenuContent>
    </DropdownMenu>
   </div>

   <form class="flex items-end">
    <label for="default-search" class="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

    <div class="relative flex items-end">
     <input
      type="search"
      id="default-search"
      class="block w-full p-2.5 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="search here"
      required
     />
    </div>
   </form>

   <div
    id="static-modal"
    data-modal-backdrop="static"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
   ></div>
  </div>

  <div :class="['relative', 'overflow-auto']" style="max-height: 300px">
   <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
    <thead class="text-xs text-gray-900 uppercase bg-gray-800 dark:bg-gray-900 dark:text-gray-800 sticky top-0">
     <tr>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Name</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Protocol</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Created at</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Actions</th>
     </tr>
    </thead>
    <tbody v-for="p in products">
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       <div class="truncate" style="max-width: 200px">{{ p.title }}</div>
      </th>
      <td class="px-6 py-4">{{ p.category }}</td>
      <td class="px-6 py-4">{{ p.category }}</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <Dialog>
         <DialogTrigger>
          <Icon name="ant-design:eye-filled" size="20px" />
         </DialogTrigger>
         <DialogContent class="sm:max-w-[625px]">
          <DialogHeader>
           <DialogTitle>Modify existing Invitation</DialogTitle>
           <DialogDescription> In this tab it's possible to see available invitation. </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
           <div class="items-center gap-4">
            <RadioGroup>
             <div class="flex justify-center">
              <div class="flex items-center space-x-2 mx-3">
               <RadioGroupItem id="option-one" value="option-one" disabled />
               <Label for="option-one">Single use</Label>
              </div>
              <div class="flex items-center space-x-2">
               <RadioGroupItem id="option-two" value="option-two" disabled selected />
               <Label for="option-two">Multiple use</Label>
              </div>
             </div>
            </RadioGroup>
            <div class="flex justify-center">
             <NuxtImg :src="p.image" width="130" heigth="130" />
            </div>
           </div>
           <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Alias </Label>
            <Input id="username" class="col-span-2" />
           </div>
          </div>
          <DialogFooter>
           <Button> Create Invitation <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5" /></Button>
          </DialogFooter>
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
            This action cannot be undone. This will permanently delete the invitation from the system.
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
  </div>
 </a>
</template>

<style scoped>
.my-button {
 background-color: #c1c1c1;
 border-radius: 1rem;
 text-align: center;
 padding: 5px;
}
</style>
