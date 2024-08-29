export default function Idpage({ params }: any) {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  py-2 border-2 border-white w-[700px] bg-white/10 mt-52">
          <h1 className="text-3xl font-semibold pb-2 mb-2">ID PAGE</h1>
          <div className="flex items-center gap-2 bg-green-700 font-semibold p-2">
            {params.id}
          </div>
        </div>
      </div>
    </>
  );
}
