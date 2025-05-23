import React from 'react'
import { z } from 'zod';
import {useForm} from 'react-hook-form';


const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  company_id: z.string().min(1, { message: "Select or Add new Company" }),
  location: z.string().min(1, { message: "Select a Location" }),
 

})
const PostJob = () => {

  useForm({

    resolver: zodResolver(schema),
  })


  return <div>PostJob</div>
  
}

export default PostJob