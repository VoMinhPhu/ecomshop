import { cn } from '@/lib/utils';

interface SearchKeywordsProps {
  keywords: string[];
  onSelect: (keyword: string) => void;
}

const SearchKeywords = ({ keywords, onSelect }: SearchKeywordsProps) => {
  return (
    <div className="flex gap-3">
      {keywords.map((k, index) => (
        <span
          key={k}
          className={cn('cursor-pointer hover:underline min-w-fit', index >= 3 && 'hidden md:inline')}
          onClick={() => onSelect(k)}
        >
          {k}
        </span>
      ))}
    </div>
  );
};

export default SearchKeywords;
