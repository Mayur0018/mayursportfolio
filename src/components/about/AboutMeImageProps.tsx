import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

interface AboutMeImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function AboutMeImage({
  src: propSrc,
  alt: propAlt,
  className = ""
}: AboutMeImageProps) {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data } = await api.get('/config');
      return data;
    }
  });

  const defaultSrc = "https://api.builder.io/api/v1/image/assets/TEMP/5525a3a7847cb843c283874a74274b07e524cb9d?placeholderIfAbsent=true&apiKey=cc41b09cf7254ba2b7ac9ef9873ba48a";
  const src = propSrc || config?.aboutMe?.image || defaultSrc;
  const alt = propAlt || "About me profile image";
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain w-full max-w-md md:max-w-[525px] rounded-none aspect-[0.92] ${className}`}
    />
  );
}
