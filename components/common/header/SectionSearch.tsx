'use client';

import { useEffect, useRef, useState } from 'react';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useDebounce } from '@/hooks/ui/header/useDebounce';
import { SEARCH_KEYWORDS } from '@/constants/searchKeywords';

import SearchDropdown from './SearchDropdown';
import SearchKeywords from './SearchKeywords';

const TYPE_ANIMATION_SEQUENCE = [
  'Tìm kiếm sản phẩm...',
  1000,
  'Tìm kiếm điện thoại...',
  1000,
  'Tìm kiếm laptop...',
  1000,
  'Tìm kiếm phụ kiện...',
  1000,
  'Tìm kiếm chuột máy tính...',
  1000,
  'Tìm kiếm bàn phím...',
  1000,
];

const SectionSearch = () => {
  // const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [visibleKeywords, setVisibleKeywords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const random = [...SEARCH_KEYWORDS].sort(() => 0.5 - Math.random()).slice(0, 6);
    setVisibleKeywords(random);
  }, []);

  const handleKeywordSelect = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative lg:w-130">
        <Input
          ref={inputRef}
          aria-label="Tìm kiếm sản phẩm"
          className="w-full pr-16 bg-white rounded-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {!query && !isFocused && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground text-base md:text-sm">
            <TypeAnimation sequence={TYPE_ANIMATION_SEQUENCE} wrapper="span" speed={50} repeat={Infinity} />
          </div>
        )}

        <Button className="absolute top-0 right-0 w-15 rounded-r-sm rounded-l-none">
          <SearchIcon />
        </Button>

        {isFocused && <SearchDropdown query={debouncedQuery} />}
      </div>

      <div className="text-white text-[13px] flex items-center mt-1">
        <SearchKeywords keywords={visibleKeywords} onSelect={handleKeywordSelect} />

        <div className="ml-auto md:hidden">
          <Button variant="ghost">
            {/* <Button onClick={() => setIsCategoryOpen((prev) => !prev)} variant="ghost"> */}
            <MenuIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionSearch;
