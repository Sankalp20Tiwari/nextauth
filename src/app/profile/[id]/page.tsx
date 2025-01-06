
function page({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-1 rounded bg-green-500 text-black" >Profile</h1>
      <h2 className="p-1 m-5 rounded bg-green-500 text-black">{params.id}</h2>
    </div>
  )
}

export default page