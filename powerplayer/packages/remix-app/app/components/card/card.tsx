interface CardProps {
  title: string;
  children: any;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="
        relative
        bg-white
        p-4
        rounded-lg
        ring-1
        ring_slate-400
        shadow-xl"
         key={title}>

      <h3 className="
        relative
        pl-2 pr-2
        text-center
        text-black
        text-2xl
        font-bold">
        { title }
      </h3>

      <hr className="bg-black mt-6 mb-4" />

      { children }
    </div>
  );
}
