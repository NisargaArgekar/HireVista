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
