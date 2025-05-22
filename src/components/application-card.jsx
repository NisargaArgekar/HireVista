import React from 'react'
import {Card, CardHeader, CardTitle } from './ui/card'
import { Download } from 'lucide-react'

const ApplicationCard = ({application, isCandidate=false}) => {

  console.log("ApplicationCard props:", application);

  const handleDownload = () =>{
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between font-bold'>
            {
              isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              :application?.name
            }
            <Download size={18}
            className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
            onClick={handleDownload}
            />
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default ApplicationCard;