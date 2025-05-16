import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import { getSingleJob } from '@/api/apiJobs';
import  useFetch from  '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';

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
  <div>
    <div>
      <h1>{job?.title}</h1>
      
      <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
    </div>
  </div>
  );
}

export default JobPage