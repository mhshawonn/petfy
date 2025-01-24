import Hero from './components/Hero';
import AnimalCard from './components/AnimalCard';
import Dog from '../assets/image/blackdog.jpg'
import Cat from '../assets/image/blaccat.jpg'
import Cat1 from '../assets/image/newcat.jpg'

function DonationPage() {
  const animals = [
    {
      name: 'Max',
      image: Dog,
      description: 'A loving dog looking for a forever home.',
    },
    {
      name: 'Luna',
      image: Cat,
      description: 'A playful cat who needs medical care.',
    },
    {
      name: 'Rocky',
      image: Cat1,
      description: 'A rescued puppy requiring special attention.',
    },
  ];

  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Animals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal,index) => (
            <AnimalCard key={index} {...animal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonationPage;