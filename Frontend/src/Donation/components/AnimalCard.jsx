import { Link } from 'react-router-dom';
import Dog from '../../assets/image/twindog.jpg'

function AnimalCard({ name, image, description }) {
    console.log(image)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src= {image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to="/donate/page"
          className="block text-center bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Donate to Help
        </Link>
      </div>
    </div>
  );
}

export default AnimalCard;