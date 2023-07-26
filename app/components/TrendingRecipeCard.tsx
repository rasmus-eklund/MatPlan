import React from 'react';

type ImageURL = {
  src: string;
  name: string;
};

export default function TrendingRecipeCard({
  src,
name
}: ImageURL) {
  return (
    <div>
      <a href="#" className="group relative block bg-black">
        <img
          src={src}
          className="absolute inset-0 h-3/5 w-full rounded-lg object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-16 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-5 italic">
{name}
          </p>

          <div className="">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
