
import { Meteors } from "@/components/ui/meteors";
async function page({ params }: any) {
    const { id } =  params; // You can destructure `params` here

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-1 rounded bg-gray-500 text-black" >Profile</h1>
       
      <h2 className="p-1 m-5 rounded bg-gray-500 text-black">{id}</h2>
      <Meteors number={50} />
    </div>
  )
}

export default page
