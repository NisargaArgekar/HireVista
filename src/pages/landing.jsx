import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import  { Carousel,CarouselContent,CarouselItem} from '@/components/ui/carousel'
import companies from '../db/companies.json'
import que from '../db/que.json'
import Autoplay from 'embla-carousel-autoplay'
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center' >
        <h1 className='flex flex-col items-center justify-center
         gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl
        tracking-tighter py-4' > 
          Find Your Dream Job  {" "}
        <span className=' flex items-center gap-2 sm:gap-6'>
           in <img src='/icon.png' alt='logo'
        className='h-14 sm:h-24 lg:h-32'/></span>
        </h1>
         <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link to="/joblisting"> 
        <Button variant={"green"} size={"xl"}>
          Find Jobs
          </Button>
        </Link>
        <Link to="/post-job"> 
        <Button variant={"destructive"} size={"xl"}>Post a Job</Button>
        </Link>
      </div>


      {/*carousel*/}
      <Carousel  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}className="w-full py-10">
      <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
       {companies.map(({name,id,path})=>{
        return <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
          <img src={path} alt={name}
          className='h-9 sm:h-14 object-contain'/>
        </CarouselItem>
       })}
      </CarouselContent>
    </Carousel>


      {/*banner*/}
      <img src='/banner.jpeg' className='w-full'/>

    <section className='grid grid-cols-1 md:grid-cols-2 gap-4' >
      {/* cards */}
      <Card>
       <CardHeader>
         <CardTitle>Job hunters</CardTitle>
         
        </CardHeader>
       <CardContent>
          <p>Track your applications and manage everything in one place.</p>
       </CardContent>
      </Card>
       <Card>
       <CardHeader>
         <CardTitle>Recruiter</CardTitle>
        
        </CardHeader>
       <CardContent>
          <p>Companies can post jobs and manage applications easily.
          Find the right candidates faster with smart tools.</p>
       </CardContent>
      </Card>
    </section>



      {/* Accordion */}
  <Accordion type="single" collapsible>
    {que.map((que,index)=>{
     return ( <AccordionItem  key={index} value={`item-${index+1}`}>
    <AccordionTrigger>{que.question}</AccordionTrigger>
    <AccordionContent>
      {que.answer}
    </AccordionContent>
  </AccordionItem>
  );

    })}
  
</Accordion>

      
    </main>
  )
}

export default LandingPage