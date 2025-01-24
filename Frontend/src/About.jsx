import { useState } from 'react';

import member1 from "./assets/image/shawon.jpg";
import member2 from "./assets/image/faiak.jpg";
import member3 from "./assets/image/tahsin.jpg";
import member4 from "./assets/image/hridoy.png";

const teamData = [
  {
    name: "Mahfuzul Islam Shawon",
    education: "CSE, University of Dhaka",
    position: "Founder & CEO",
    organizations: ["Failure Academy", "Origin Soft"],
    image: member1
  },
  {
    name: "Ahaj Mahin",
    education: "CSE, University of Dhaka",
    position: "Team Member",
    organizations: [],
    image: member2
  },
  {
    name: "Tahsin Ahmed",
    education: "CSE, University of Dhaka",
    position: "Team Member",
    organizations: [],
    image: member3
  },
  {
    name: "Atikur Rahman Hridoy",
    education: "CSE, University of Dhaka",
    position: "Team Member",
    organizations: [],
    image: member4
  }
];

export default function About() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-pink-600">Our Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={300 + (index * 100)}
              className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300 border-l-2 border-b-2 border-l-pink-600 border-b-pink-600"
            >
              {/* Member Image */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
                {/* Placeholder div until you add images */}
                <div className="w-full h-full bg-gray-700"></div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-pink-600 mb-2">{member.name}</h3>
                <p className="text-gray-300 mb-2">{member.education}</p>
                <p className="text-white font-medium mb-2">{member.position}</p>
                {member.organizations && member.organizations.length > 0 && (
                  <div className="text-gray-400 text-sm">
                    {member.organizations.map((org, idx) => (
                      <p key={idx}>{org}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-pink-600">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-600">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-600">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}