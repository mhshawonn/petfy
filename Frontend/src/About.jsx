
import owl from "./assets/image/owl.jpg";

const Data = [
  {
    title: "Owl",
    content: "White",
    description: "Owls teach us that true love is found in understanding and patience.",
    image: <img src={owl} alt="Cat" className="w-full sm:w-[80%] mx-auto max-h-[350px] object-cover" />
  }
];

export default function About() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Left Side - Image */}
          
          
        
          <div className="space-y-4 xl:pr-36 p-4 border-l-2 border-b-2 border-l-pink-600 border-b-pink-600">
            <p data-aos="fade-up" data-aos-delay="300" className="text-pink-600 text-2xl uppercase">
              Our Pet
            </p>
            <h1 data-aos="fade-up" data-aos-delay="500" className="uppercase text-5xl">
              {Data[0].title}
            </h1>
            <p data-aos="fade-up" data-aos-delay="700">
              {Data[0].content}
            </p>
            <p data-aos="fade-up" data-aos-delay="700">
              {Data[0].description}
            </p>

            <button
             data-aos="fade-up"
             data-aos-delay="500"
             className="bg-pink-400 text-white hover:bg-blue-500 px-4 py-1 rounded-md duration-200"
            >
              Learn More
            </button>
            
          </div>
            {/* Right Side - Text Content */}
          <div data-aos="zoom-in">
            {Data[0].image}
          </div>
        </div>
      </div>
    </section>
  );
}