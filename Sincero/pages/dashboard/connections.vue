<template>
 <a
  class="block mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
 >
  <div class="relative flex justify-between mb-1 items-center">
   <div class="flex items-center">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Invitations</h5>
    <Dialog>
     <DialogTrigger>
      <Button class="flex items-center justify-center mx-2">
       New invitation
       <Icon name="ant-design:plus-square-outlined" class="mx-0.5" size="24px" />
      </Button>
     </DialogTrigger>
     <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
       <DialogTitle>Create a new invitation</DialogTitle>
       <DialogDescription>
        In this tab it's possible to create a new invitation to connect two, or multiple nodes.
       </DialogDescription>
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
        <Input id="username" class="col-span-2" />
       </div>
      </div>
      <DialogClose>
        <Button
    variant="outline" @click="() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }"
  >
    Create Invitation <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5"/>
  </Button>


       
      </DialogClose>
     </DialogContent>
    </Dialog>
    
    <DropdownMenu class="mx-2 flex items-end">
     <DropdownMenuTrigger as-child>
      <Button variant="outline">
       25
       <Icon name="ant-design:down-outlined" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent class="w-18">
      <DropdownMenuRadioGroup v-model="position">
       <DropdownMenuRadioItem value="top"> 10 </DropdownMenuRadioItem>
       <DropdownMenuRadioItem value="bottom"> 25 </DropdownMenuRadioItem>
       <DropdownMenuRadioItem value="right"> 100 </DropdownMenuRadioItem>
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
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
   ></div>
  </div>

  <div class="relative h-64 overflow-auto">
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
       {{ p.title }}
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
           <DialogDescription>
            In this tab it's possible to see available invitation.
           </DialogDescription>
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
               <RadioGroupItem id="option-two" value="option-two" disabled selected/>
               <Label for="option-two">Multiple use</Label>
              </div>
             </div>
            </RadioGroup>
            <div class="flex justify-center">
                <NuxtImg :src="p.image" 
                width="130"
                heigth="130" />
            </div>
           </div>
           <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Alias </Label>
            <Input id="username" class="col-span-2" />
           </div>
          </div>
          <DialogFooter>
           <Button type="submit">
            Create Invitation <Icon name="ant-design:send-outlined" size="20px" class="mx-0.5"
           /></Button>
          </DialogFooter>
         </DialogContent>
        </Dialog>
        <AlertDialog>
    <AlertDialogTrigger as-child>
      <Icon name="ant-design:delete-outlined" size="20px"/>
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
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuLabel,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const position = ref("bottom");
let products: any[] = [];
const response = await fetch("https://fakestoreapi.com/products");
const data = await response.json();
products = data;
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
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
</script>

<style></style>
