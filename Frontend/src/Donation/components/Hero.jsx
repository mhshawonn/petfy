import { Link } from 'react-router-dom';
import Cat from '../../assets/image/owl.jpg'

function Hero() {
  return (
    <div className="relative h-[500px]">
      <div className="absolute inset-0">
        <img
          src={Cat}
          className="w-full h-full object-cover"
          alt="Pets"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Help Us Save Lives
        </h1>
        <p className="text-xl text-white mb-8">
          Every donation makes a difference in an animal's life
        </p>
        <Link
          to="/donate/page"
          className="bg-pink-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-purple-700 transition-colors"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;