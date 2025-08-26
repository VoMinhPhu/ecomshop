'use client';

import { useState } from 'react';

import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { MenuIcon, SearchIcon } from 'lucide-react';

const SectionSearch = () => {
  const [category, setCategory] = useState<boolean>(false);

  return (
    <div>
      <div className="relative lg:w-130">
        <Input placeholder="Tìm kiếm sản phẩm..." className="w-full pr-16 bg-white/80" />
        <Button className="absolute cursor-pointer top-0 right-0 w-15 rounded-r-sm rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
      <div className="text-white text-[13px] flex items-center mt-1 ">
        <div className="flex gap-3">
          <span className="cursor-pointer hover:underline">Asus OLED</span>
          <span className="cursor-pointer hover:underline">Bàn phím cơ AULA</span>
          <span className="cursor-pointer hover:underline">PC</span>
          <span className="cursor-pointer hover:underline">USB</span>
          <span className="cursor-pointer hover:underline">Sách</span>
        </div>
        <div className="ml-auto md:hidden">
          <Button onClick={() => setCategory(!category)} variant={'ghost'}>
            <MenuIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionSearch;
