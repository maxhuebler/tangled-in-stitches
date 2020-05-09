export default function Index() {
  return (
    <>
      <div className="container flex flex-col mx-auto bg-purple-200 py-24 rounded-xl">
        <div className="text-center">
          <h1 className="text-lg md:text-4xl uppercase font-black leading-tight">
            $20 off $100 plus,
          </h1>
          <h1 className="text-lg md:text-4xl uppercase font-black italic leading-tight">
            get free next-day delivery
          </h1>
          <button className="mt-10 bg-black text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-gray-800">
            <a href="">Search All Today's Deals</a>
          </button>
        </div>
      </div>
      <div className="container justify-center flex flex-row mx-auto py-4">
        <button className="mt-10 focused bg-gray-200 mr-6 uppercase text-black text-lg font-bold py-6 px-16 rounded-lg hover:bg-purple-300 hover:text-white">
          <a href="">home</a>
        </button>
        <button className="mt-10 bg-gray-200 mx-6 uppercase text-black text-lg font-bold py-6 px-16 rounded-lg hover:bg-purple-300 hover:text-white">
          <a href="">new in</a>
        </button>
        <button className="mt-10 bg-gray-200 mx-6 uppercase text-black text-lg font-bold py-6 px-16 rounded-lg hover:bg-purple-300 hover:text-white">
          <a href="">shirts</a>
        </button>
        <button className="mt-10 bg-gray-200 mx-6 uppercase text-black text-lg font-bold py-6 px-16 rounded-lg hover:bg-purple-300 hover:text-white">
          <a href="">sweaters</a>
        </button>
        <button className="mt-10 bg-gray-200 ml-6 uppercase text-black text-lg font-bold py-6 px-16 rounded-lg hover:bg-purple-300 hover:text-white">
          <a href="">jackets</a>
        </button>
      </div>
    </>
  )
}
