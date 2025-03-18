'use client';

import { useState } from 'react';
import { MenuItem } from '@/types';
import { Button } from './Button';

interface MenuTabsProps {
  items: MenuItem[];
  categories: string[];
  enableFiltering?: boolean;
}

export const MenuTabs = ({ items, categories, enableFiltering = true }: MenuTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  
  const filteredItems = enableFiltering
    ? items.filter((item) => item.category === activeCategory)
    : items;

  return (
    <div>
      {enableFiltering && (
        <div className="mb-12 flex overflow-x-auto pb-2 gap-2">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={activeCategory === category ? "primary" : "outline"} 
              className="whitespace-nowrap capitalize"
              onClick={() => setActiveCategory(category)}
            >
              {category.replace('-', ' ')}
            </Button>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="border-b border-gray-800 pb-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-medium flex items-center gap-2">
                {item.name}
                {item.dietary && item.dietary.length > 0 && (
                  <span className="flex gap-1">
                    {item.dietary.includes('vegetarian') && (
                      <span className="text-green-500 text-xs border border-green-500 px-1 rounded">V</span>
                    )}
                    {item.dietary.includes('vegan') && (
                      <span className="text-green-600 text-xs border border-green-600 px-1 rounded">VG</span>
                    )}
                    {item.dietary.includes('gluten-free') && (
                      <span className="text-amber-500 text-xs border border-amber-500 px-1 rounded">GF</span>
                    )}
                  </span>
                )}
              </h3>
              <span className="text-amber-300">${item.price}</span>
            </div>
            <p className="text-gray-400">{item.description}</p>
            {item.ingredients && (
              <p className="text-gray-500 text-sm mt-2">
                <span className="italic">Ingredients:</span> {item.ingredients.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};