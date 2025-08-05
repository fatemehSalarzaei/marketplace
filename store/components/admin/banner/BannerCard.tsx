import React from 'react';
import { Banner } from '@/types/admin/banner/banner';

const BannerCard = ({ banner }: { banner: Banner }) => {
  return (
    <div className="rounded-lg p-4 shadow">
      <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{banner.title}</h3>
    
    </div>
  );
};

export default BannerCard;
