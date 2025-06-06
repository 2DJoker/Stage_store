"use client"

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
}

const phrases = [
    'Поиск... ',
  'Air Jordan 1',
  'Nike Air Max',
  'Adidas Samba',
  'Yeezy Boost',
  'Converse All Star',
];

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('')
  const [focused, setFocused] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState('');
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(() => {
    Api.products.search(searchQuery).then(items => {
      setProducts(items);
    });
  }, 
  250,
  [searchQuery]);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        
        setPlaceholder(currentPhrase.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        
        setPlaceholder(currentPhrase.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <>   
      {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'></div>}

      <div
        ref={ref}
        className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}
      >
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input 
          className='rounded-2xl outline-none w-full bg-gray-200 pl-11'
          type='text'
          placeholder={focused ? '' : `${placeholder}`}
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length >0 && <div className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12'
        )}>
            {
              products.map((product) => (
                <Link
                key={product.id}
            className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
            href={`/products/${product.id}`}> 
            <img 
            className='rounded-sm h-12 w-12'
            src={product.imageUrl}
            alt={product.name}
            />
            <span>{product.name}</span>
            </Link>
              ))}
        </div>}
      </div>
    </>
  );
}
