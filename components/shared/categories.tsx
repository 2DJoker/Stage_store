'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCategoryStore } from './category';
import { Category } from '@prisma/client';

interface Props {
    items: Category[]
    className?: string;
}


export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    const setActiveCategory = useCategoryStore((state) => state.setActiveId);

    
    
    const handleClick = (id: number) => {
        console.log('Category clicked:', id); // 👈 проверка
        setActiveCategory(id);
      
        const element = document.getElementById(`category-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn(`Element with id category-${id} not found`);
        }
      };
      
    return (
        <div className={cn('flex justify-center py-4 px-2', className)}>
            <div className={cn('inline-flex gap-1 bg-gray-200 p-1 rounded-2xl shadow-lg max-w-full')}>
                {items.map(({ name, id }) => (
                    <button
                        key={id}
                        type="button"
                        className={cn(
                            "flex items-center font-bold h-11 rounded-2xl px-5",
                            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                        )}
                        onClick={() => handleClick(id)}
                    >
                        {name}
                    </button>
                ))}

                {/* <button */}
                    {/* type="button" */}
                    {/* className={cn( */}
                        {/* "flex items-center font-bold h-11 rounded-2xl px-5 bg-black text-white shadow-md shadow-gray-300" */}
                    {/* )} */}
                    {/* onClick={() => handleClick(premiumId)} */}
                {/* > */}
                    {/* <Sparkles color='#ffffff' className="h-4 w-4 mr-2" strokeWidth={2} /> */}
                    {/* {Premium} */}
                {/* </button> */}
            </div>
        </div>
    );
};
