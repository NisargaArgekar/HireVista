import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import { getSingleJob } from '@/api/apiJobs';
import  useFetch from  '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';
import { Briefcase, DoorClosedIcon, DoorOpenIcon, MapPinIcon } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

const JobPage= () => {

    const { isLoaded, user} = useUser();

    const { id } = useParams();

    const {
    loading:loadingJob,
    data:job,
    fn:fnJob,
    }= useFetch(getSingleJob,{
      job_id: id,
    });


    useEffect(()=>{
      if(isLoaded) fnJob();
    }, [isLoaded]);


    if(!isLoaded || loadingJob){
      return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>;
    }



  return (
  <div className='flex flex-col gap-8 mt-5'>
    <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
      <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
      <img src={job?.company?.logo_url}  className="h-12" alt={job?.title} /> 
    </div>


    <div className='flex justify-between'>
      <div className='flex gap-2'>
        <MapPinIcon/>
        {job?.location}
      </div>

      <div className='flex gap-2'>
        <Briefcase/>
        {job?.applications?.length} Applicants
      </div>

       <div className='flex gap-2'>
        
        {job?.isOpen?
        (<><DoorOpenIcon/> Open</>)
        :(<><DoorClosedIcon/>Closed
        </>
        )}
      </div>

    </div>
{/* hiring status */}

    <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
    <p className='sm:text-lg'>{job?.description}</p>

    
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
     <MDEditor.Markdown className='!bg-transparent !text-white sm:text-4xl' 
     source={job?.requirements}/>
  </div>

//  render applications
  );
 
}

export default JobPage;