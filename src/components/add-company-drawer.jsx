import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, 
    DrawerDescription, DrawerFooter, Button } from '@/components/ui/drawer';
import { Input } from './ui/input';
import useFetch from '@/hooks/use-fetch';
import { addNewCompany } from '@/api/apiCompanies';

const shema = z.object({
    name: z.string().min(1, {message:"Company name is Required"}),
     resume: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        (file[0].type === "image/png" ||
          file[0].type === "image/jpeg"),
      { message: "Only Images are allowed" }
    ),
})


const AddCompanyDrawer = (fnCompanies) => {


    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm({
            resolver:zodResolver(shema),
        });


        const {
          loading: loadingAddCompany,
          error:errorAddCompany,
          data: dataAddCompany,
          fn:fnAddCompany,
        } = useFetch(addNewCompany);

      const onsubmit = () => {};

  return (
    <Drawer>
  <DrawerTrigger>
    <Button type='button' size='sm' variant='green'>
      Add Company
    </Button>
  </DrawerTrigger>
  <DrawerContent>
  

      <form className='flec gap-2 p-4 pb-0'>
        <Input palceholder="Company name"{...register("name")}/>
        <Input 
        type="file"
        accept="image/"
        className="file:text-gray-500" 
        {...register("logo")}
        />
        <Button 
        type="button"
        onClick={handleSubmit(onsubmit)}
        variant="destructive"
        className="w-40"
        >
          Add
        </Button>

      </form>
      {errors.name && <p className='text-res-500'>{errors.name.message}</p>}
      {errors.logo && <p className='text-res-500'>{errors.logo.message}</p>}
   
    
    
    <DrawerFooter>
    
      <DrawerClose asChild>
        <Button variant="secondary" type="button">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default AddCompanyDrawer;