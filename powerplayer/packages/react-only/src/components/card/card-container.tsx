import React from 'react';

interface CardContainerProps {
  title: string;
  description?: any;
  cards: any;
  cols: number;
}

export default function CardContainer ({title, description, cards, cols}: CardContainerProps) {
  return (
    <div className="container px-2 bg-yellow-50 rounded-lg ring-1 ring-yellow-600">
    <h2 className="p-4 font-sans font-bold mx-auto">{title}</h2>
      { description && (
        <div className="pl-4 pr-4">
          { description }
        </div>
      )}
      <div className="
            grid
            p-4
            lg:grid-cols-2
            md:grid-cols-1
            gap-2
      ">
        {cards}
      </div>
    </div>
  );
}
