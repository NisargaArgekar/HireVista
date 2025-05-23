import React, { useEffect } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { State } from 'country-state-city';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { getCompanies } from "@/api/apiCompanies";
import { Navigate } from 'react-router-dom';




const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  company_id: z.string().min(1, { message: "Select or Add new Company" }),
  location: z.string().min(1, { message: "Select a Location" }),
 

})
const PostJob = () => {

  const {isLoaded,user} = useUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } =useForm({
    defaultValues: {

      location: "",
      company_id: "",
      requirements: "",
      
    },
    resolver: zodResolver(schema),
  })

  const { fn: fnCompanies, data: Companies, loading:loadingCompanies} = useFetch(getCompanies);

    useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  if(!isLoaded || loadingCompanies){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
  }

  if(user?.unsafeMetadata?.role !== "recruiter"){
    return <Navigate to = "/jobs"/>
  }


  return <div>
    <h1 className='gradient-title font-extrabold pb-8 text-5xl sm:text-7xl text-center'>
    Post a Job
    </h1>
    <form className='flex flex-col gap-4 p-4 pb-0'>
      <Input placeholder="Job Title" {...register("title")} />
      {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
    


    <Textarea placeholder='Job Description'
     {...register("description")} />   
    {errors.description &&(
    <p className='text-red-500'>{errors.description.message}</p>
    )}

    <div className='flex gap-4 items-center'>
      <Controller
      name="education"
      control={control}
      render={({ field }) => (

        
      )}
      />
     <Select 
    //  value={location} 
    //  onValueChange={(value)=>setLocation(value)}
     >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({name})=>{
            return(
          <SelectItem  key={name}  value={name}>
            {name}
          </SelectItem>  );
          })}
          
        </SelectGroup>
      </SelectContent>
    </Select>


      <Select 
      // value={company_id} onValueChange={(value)=>setCompany_id(value)}
      >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Companies?.map(({name,id})=>{
            return(
          <SelectItem  key={name}  value={id}>
            {name}
          </SelectItem>  );
          })}
          
        </SelectGroup>
      </SelectContent>
    </Select>

    {/* Add Company Drawer */}
    </div>
    </form>
    </div>
  
}

export default PostJob