import React from 'react';

interface CardProps {
  title: string;
  link: any;
  children: any;
}

export default function Card({ link, title, children }: CardProps) {
  return (
    <div className="
        relative
        bg-white
        p-4
        rounded-lg
        ring-1
        ring_slate-400
        shadow-xl"
         key={link}>

      <h3 className="
        relative
        pl-2 pr-2
        text-center
        text-black
        text-2xl
        font-bold">
        {/*<NavLink to={link}>{ title }</NavLink>*/}
        {link}
      </h3>

      <hr className="bg-black mt-6 mb-4" />

      { children }
    </div>
  );
}
