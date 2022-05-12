import Link from 'next/link';
import Image from 'next/image';
interface CardProps {
  children: any;
  image: string;
  optimizeImages: boolean;
}

export default function ImageCard({ children, image, optimizeImages = false }: CardProps) {
  console.log(`${optimizeImages} from component ImageCard`);
  return (
    <div className="
        relative
        bg-white
        p-4
        rounded-lg
        ring-1
        ring_slate-400
        shadow-xl" key={image}>

        <div className="
        pr-4
        pt-2
        pb-2
        grid
        grid-cols-2
        ">
          <div>
            {optimizeImages &&
              <Image alt="Podcast Image" src={image} width="200" height="200" className="w-3/5"/>
            }
            {!optimizeImages &&
              <img alt="Podcast Image" src={image} width="200" height="200" className="w-3/5" />
            }
          </div>
          <div className="pb-5">
          { children }
          </div>
        </div>
    </div>
  );
}
