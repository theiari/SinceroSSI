<template>
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
           <DialogDescription> {{tabDetails}} </DialogDescription>
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
</template>

<script setup lang="ts">
//fetch random products
let products: any[] = [];
const response = await fetch("https://fakestoreapi.com/products");
const data = await response.json();
products = data;
</script>