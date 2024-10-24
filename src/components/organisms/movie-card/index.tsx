import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  title: string;
  year: number;
  imageUrl: string;
  link: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  imageUrl,
  link,
}) => {
  return (
    <div className="bg-[#092C39] overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 rounded-xl p-[8px] cursor-pointer">
      <Link href={link}>
        <div className=" h-[400px]">
          <Image
            src={imageUrl}
            alt={title}
            width={1000}
            height={1000}
            objectFit="cover"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="p-4 text-white">
        <h3 className="text-xl leading-8 font-medium">{title}</h3>
        <p className="text-[14px] leading-6 font-normal">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
