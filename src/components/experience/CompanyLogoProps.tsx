import React from 'react';

interface CompanyLogoProps {
  company: string;
}

 const CompanyLogo: React.FC<CompanyLogoProps> = ({ company }) => {
  const logos = {
    google: (
      <div className="flex justify-center items-center w-12 h-12">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z\" fill=\"#FFC107\"></path><path d=\"M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z\" fill=\"#FF3D00\"></path><path d=\"M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z\" fill=\"#4CAF50\"></path><path d=\"M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z\" fill=\"#1976D2\"></path></svg>",
          }}
        />
      </div>
    ),
    youtube: (
      <div className="flex justify-center items-center w-12 h-12 bg-red-600 rounded">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"32\" height=\"24\" viewBox=\"0 0 32 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M31.327 3.747a4.012 4.012 0 00-2.827-2.84C26.008 0.25 16 0.25 16 0.25s-10.008 0-12.5.657A4.012 4.012 0 00.673 3.747C0 6.253 0 11.5 0 11.5s0 5.247.673 7.753a4.012 4.012 0 002.827 2.84c2.492.657 12.5.657 12.5.657s10.008 0 12.5-.657a4.012 4.012 0 002.827-2.84C32 16.747 32 11.5 32 11.5s0-5.247-.673-7.753z\" fill=\"#FF0000\"></path><path d=\"M12.8 16.4l8.267-4.9-8.267-4.9v9.8z\" fill=\"#fff\"></path></svg>",
          }}
        />
      </div>
    ),
    apple: (
      <div className="flex justify-center items-center w-12 h-12">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M38.71 20.07C37.35 13.19 31.28 8 24 8c-5.78 0-10.79 3.28-13.3 8.07C4.69 16.72 0 21.81 0 28c0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10c0-5.28-4.11-9.56-9.29-9.93z\" fill=\"url(#apple-gradient)\"></path><defs><linearGradient id=\"apple-gradient\" x1=\"24\" y1=\"8\" x2=\"24\" y2=\"40\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#A3AAAE\"></stop><stop offset=\"1\" stop-color=\"#5C6670\"></stop></linearGradient></defs></svg>",
          }}
        />
      </div>
    ),
  };

  const logo = (logos as Record<string, JSX.Element>)[company];
  if (logo) return logo;
  return (
    <div className="flex justify-center items-center w-12 h-12 rounded bg-zinc-800 text-white text-sm font-bold uppercase">
      {company?.slice(0, 2) || "??"}
    </div>
  );
};


export default CompanyLogo;
