import React from 'react';

interface CardProps {
  children: any;
  image: string;
}

export default function ImageCard({ children, image }: CardProps) {
  return (
    <div className="
        relative
        bg-white
        p-4
        rounded-lg
        ring-1
        ring_slate-400
        shadow-xl">

        <div className="
        pr-4
        pt-2
        pb-2
        grid
        grid-cols-2
        ">
          <div>
            <img src={ image } className="w-3/5"/>
          </div>
          <div className="pb-5">
          { children }
          </div>
        </div>
    </div>
  );
}
