

export default function Hero() {
    return (
      <div className="bg-black/20 h-full ">
          <div  className="h-full flex justify-center
                  items-center p-4">
              <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className=" space-y-4 lg:pr-36">
                      <h1 data-aos="fade-up" className="text-5xl font-bold text-pink-500 hover:drop-shadow-2xl 
                  transition-all duration-300 transform hover:scale-110">Find Your Pet</h1>
  
                      <p data-aos="fade-up" data-aos-delay="300" className="text-white">
                            The greatness of a nation and its moral
                            progress can be judged by the way its animals
                              are treated." – Mahatma Gandhi
                        </p>
                        <button
                          data-aos="fade-up"
                          data-aos-delay="100"
                          className="bg-pink-400 text-white hover:bg-blue-500 px-4 py-1 rounded-md duration-200"
                        >
                          LEARN MORE
                        </button>
  
                  </div>
  
              </div>
  
  
          </div>
  
  
  
      </div>
  
    )
  }