interface CardContainerProps {
  title: string;
  description?: any;
  cards: any;
}

export default function CardContainer ({title, description, cards}: CardContainerProps) {
  return (
    <div className="container bg-yellow-50 rounded-lg ring-1 ring-yellow-600 px-2">
      <h2 className="p-4 font-sans font-bold mx-auto">{title}</h2>
      { description && (
        <div className="pl-4 pr-4">
        { description }
        </div>
      )}
      <div className={`
          grid
          p-4
          lg:grid-cols-2
          md:grid-cols-1
          gap-2
      `}>
        {cards}
      </div>
    </div>
  );
}
