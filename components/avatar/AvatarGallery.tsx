import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PRESET_AVATARS } from '../../constants';
import { Avatar } from '../../types';

interface AvatarGalleryProps {
  selected: Avatar | null;
  onSelect: (avatar: Avatar) => void;
}

export const AvatarGallery: React.FC<AvatarGalleryProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {PRESET_AVATARS.map((avatar) => {
        const isSelected = selected?.id === avatar.id;
        
        return (
          <motion.div
            key={avatar.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(avatar)}
            className={`
              relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 group
              ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-xl shadow-primary/10' : 'border-transparent hover:border-accent bg-card'}
            `}
          >
            <img 
              src={avatar.previewUrl} 
              alt={avatar.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-sm font-bold text-white truncate">{avatar.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-gray-300 mt-0.5">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>Popular</span>
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1.5 shadow-lg animate-in zoom-in duration-200">
                <Check className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
