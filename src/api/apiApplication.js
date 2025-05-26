import supabaseClient from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resume")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error Uploading resume:", storageError);
    return null;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("resume")
    .getPublicUrl(fileName);

  const resume = publicUrlData.publicUrl;

  const { data, error } = await supabase
    .from("application")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error submitting application:", error);
    return null;
  }

  return data;
}


export  async function updateApplicationStatus(token, {job_id},status){


    const supabase = await supabaseClient(token);

  
    const { data, error} =  await supabase
    .from("application")
    .update({status})
    .eq("job_id", job_id)
    .select();
   
       
    if(error || data.length === 0){ 
        console.error("Error Updating Application Status:",error);
        return null;
    }
    
    return data;

} 

export  async function getApplications(token, {user_id}){


    const supabase = await supabaseClient(token);

  
    const { data, error} =  await supabase
    .from("application")
    .select("*, jobs:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id)
    
   
       
    if(error){ 
        console.error("Error Fetching Applications :",error);
        return null;
    }
    
    return data;

}

export async function getApplicationsForRecruiter(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id")
    .eq("recruiter_id", recruiter_id);

  if (jobsError || !jobs) {
    console.error("Error fetching jobs for recruiter:", jobsError);
    return null;
  }

  const jobIds = jobs.map(job => job.id);

 
  const { data, error } = await supabase
    .from("application")
    .select("*, jobs:jobs(title,company:companies(name))")
    .in("job_id", jobIds);

  if (error) {
    console.error("Error fetching applications for recruiter:", error);
    return null;
  }

  return data;
}