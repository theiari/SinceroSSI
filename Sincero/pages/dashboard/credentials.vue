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
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast/use-toast";
import { required, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { h } from "vue";
import { ToastAction } from "@/components/ui/toast";
import Toaster from '@/components/ui/toast/Toaster.vue'
const { toast } = useToast();


export default {
 data() {
  return {
   form: {
    certification: "",
    title: "",
    grade: "",
    maxGrade: "",
    DID: "",
   },
  selectedValue: ref("5"),
  };
 },
 validations() {
  return {
   form: {
    certification: { required },
    title: { required },
    grade: { required, numeric },
    maxGrade: { required, numeric },
    DID: { numeric },
   },
  };
 },
 methods: {
  clicked() {
   console.log("clicked");
   toast({
      title: "Error",
      message: "Something went wrong, please check the field and try again",
      actions: [
       h(
        Button,
        {
         onClick: () => {
          console.log("clicked");
         },
        },
        { default: () => "Retry" }
       ),
      ],
     });
  },
  async onSubmit() {
   const $v = useVuelidate(this.validation(), this.form);
   console.log("plain $v", $v);

   console.log("Form submitted:", this.form);

   const data = await $fetch("/api/createJWT_VC", {
    method: "POST",
    body: this.form,
    headers: {
     "Content-Type": "application/json",
    },
   }).then((res) => {
    if (res.code === 200) {
      toast({
        title: 'Success',
        description: 'Data sent successfully',
        variant: 'success',
      });
    } else {

     toast({
        title: 'Something went wrong.',
        description: 'Please check the fields and try again',
        variant: 'destructive',
      });
    }
   });
  },

  validation() {
   return {
    form: {
     certification: { required },
     title: { required },
     grade: { required, numeric },
     maxGrade: { required, numeric },
     DID: { numeric },
    },
   };
  },
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
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Connections</h5>
    <Toaster />
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
        <RadioGroup v-model="form.certification" defaultValue="exam" v-bind="componentField">
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
        <Input id="title" v-model="form.title" class="col-span-1" />
        <Label for="max-grade" class="text-right col-span-1"> ?DID? </Label>
        <Input id="max-grade" v-model="form.DID" class="col-span-1" />
       </div>
       <div class="grid grid-cols-4 items-center gap-2">
        <Label for="grade" class="col-span-1"> Grade </Label>
        <Input id="grade" type="number" v-model="form.grade" class="col-span-1" />
        <Label for="max-grade" class="text-right col-span-1"> Max grade </Label>
        <Input id="max-grade" type="number" v-model="form.maxGrade" class="col-span-1" />
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
   <myTable> </myTable>
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
.toast {
  background-color: #4caf50; /* Green */
  color: white;
}
</style>
