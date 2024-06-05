<template>
 <a
  class="block mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
 >
  <div class="relative flex justify-between mb-1 items-center">
   <div class="flex items-center">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Invitations</h5>
    <!-- <button
      type="button"
      data-modal-target="static-modal" data-modal-toggle="static-modal"
      class="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-1.5 text-center inline-flex items-center justify-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <icon name="ant-design:plus-circle-outlined" color="white" class="mx-1" size="1.2em"></icon>
      New invitation
      
    </button> -->

    <Dialog>
     <DialogTrigger>
      <Button class="flex items-center justify-center mx-2">
       New invitation
       <Icon name="ant-design:plus-square-outlined" class="mx-0.5" size="24px" text-anchor="test" />
      </Button>
     </DialogTrigger>
     <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
       <DialogTitle>Create a new invitation</DialogTitle>
       <DialogDescription> In this tab it's possible to create a new invitation to connect two, or multiple nodes. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
       <div class="items-center gap-4">
        <RadioGroup>
         <div class="flex justify-center">
          <div class="flex items-center space-x-2 mx-3">
           <RadioGroupItem id="option-one" value="option-one" />
           <Label for="option-one">Single use</Label>
          </div>
          <div class="flex items-center space-x-2">
           <RadioGroupItem id="option-two" value="option-two" />
           <Label for="option-two">Multiple use</Label>
          </div>
         </div>
        </RadioGroup>
       </div>
       <div class="grid grid-cols-4 items-center gap-4">
        <Label for="username" class="text-right"> Alias </Label>
        <Input id="username" value="" class="col-span-2" />
       </div>
      </div>
      <DialogFooter>
       <Button type="submit">
        Create Invitation <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5"
       /></Button>
      </DialogFooter>
     </DialogContent>
    </Dialog>
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
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
   >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
     <!-- Modal content -->
     <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
       <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Static modal</h3>
       <button
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="static-modal"
       >
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
         <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
         />
        </svg>
        <span class="sr-only">Close modal</span>
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>

  <div class="relative h-64 overflow-auto">
   <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
    <thead class="text-xs text-gray-900 uppercase bg-gray-800 dark:bg-gray-900 dark:text-gray-800 sticky top-0">
     <tr>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Name</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Protocol</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Created at</th>
      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-900">Action</th>
     </tr>
    </thead>
    <tbody>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </a>

 <a
  class="block mb-3 max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
 >
  <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Connections</h5>
  <div class="relative h-64 overflow-auto">
   <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
    <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-800 sticky top-0">
     <tr>
      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">Name</th>
      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">Protocol</th>
      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">Created at</th>
      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">Action</th>
     </tr>
    </thead>
    <tbody>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       Apple MacBook Pro 17"
      </th>
      <td class="px-6 py-4">Silver</td>
      <td class="px-6 py-4">Laptop</td>
      <td class="px-8 py-4">
       <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </a>
</template>

<script setup lang="ts">
definePageMeta({
 layout: "dashboard",
});
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
</script>

<style></style>
