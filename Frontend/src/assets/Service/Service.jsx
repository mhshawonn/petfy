import React from 'react'

import { FaDog, FaDove } from "react-icons/fa6"; // Added FaDog and FaDove for Dog and Bird icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import wave from "../image/wave Gif.gif"

const ServiceData = [
    {
      title: "Cat",
      content: "White",
      description:
        "You can’t buy love, but you can rescue it.",
      icon: <FontAwesomeIcon icon={faCat} className='text-7xl' />,
      aosDelay: "300",
    },
    {
      title: "Dog",
      content: "Golden Retriever",
      description:
        "Dogs are not our whole life, but they make our lives whole.",
      icon: <FaDog className="text-7xl" />, // Replaced ISS with Dog icon
      aosDelay: "500",
    },
    {
      title: "Bird",
      content: "Parrot",
      description:
        "Birds are the poets of the sky, bring one home and feel the joy.",
      icon: <FaDove className="text-7xl" />, // Replaced GPS with Bird icon
      aosDelay: "700",
    },
];


export default function() {
  return (
    <div className='bg-black text-white relative z-5 0'>
        <div className="container">
            <div className='min-h-[400px]'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10'>
                  {
                    ServiceData.map((data, key) => {
                        return (
                            <div
                            key={key}
                            data-aos='fade-up' data-aos-delay={data.aosDelay}
                            className='min-h-[180px] flex flex-col justify-center
                            items-center bg-sky-900/60 rounded-xl backdrop-blur-sm
                            text-center text-2xl py-8 px-3 w-full lg:w-[300px] mx-auto'>
                              {data.icon}
                              <h1>{data.title}</h1>
                              <p className='text-1xl'>{data.content}</p>
                              <p className='text-sm'>{data.description}</p>
                            </div>
                        )
                    })
                  }
                </div>
                <img src={wave} alt=""  className='h-[200px] w-full object-cover mix-blend-screen
                  -translate-y-24 relative z-[0]
                '/>
            </div>
        </div>
    </div>
  )
}