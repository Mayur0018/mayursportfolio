interface AboutMeImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function AboutMeImage({
  src = "https://api.builder.io/api/v1/image/assets/TEMP/5525a3a7847cb843c283874a74274b07e524cb9d?placeholderIfAbsent=true&apiKey=cc41b09cf7254ba2b7ac9ef9873ba48a",
  alt = "About me profile image",
  className = ""
}: AboutMeImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain w-full max-w-md md:max-w-[525px] rounded-none aspect-[0.92] ${className}`}
    />
  );
}
