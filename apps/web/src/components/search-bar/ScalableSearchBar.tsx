'use client';

import { Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Input } from '../ui/input';

interface ScalableSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  initialWidth?: string;
  expandedWidth?: string;
  onFocus?: () => void;
  focused?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

export function ScalableSearchBar({
  className = '',
  placeholder = 'Search...',
  onSearch,
  initialWidth = 'w-[200px]',
  expandedWidth = 'w-[400px]',
  onFocus,
  focused = false,
  ref,
}: ScalableSearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center relative transition-all duration-300',
        focused ? `${expandedWidth} scale-120 -translate-x-5` : initialWidth,
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center w-full transition-all duration-300',
          focused ? 'bg-background rounded-lg shadow-lg ring-1 ring-primary/20' : ''
        )}
      >
        <Search
          className={cn(
            'absolute left-3 h-4 w-4 transition-colors',
            focused ? 'text-primary' : 'text-muted-foreground'
          )}
        />
        <Input
          type="text"
          placeholder={placeholder}
          className={cn(
            'pl-9 pr-8 py-2 transition-all',
            focused ? 'bg-background rounded-lg shadow-lg ' : ''
          )}
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
}
