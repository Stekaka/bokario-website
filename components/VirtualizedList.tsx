import React, { useState, useEffect, useRef, useCallback } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleItemCount = Math.ceil(height / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor(scrollTop / itemHeight) + visibleItemCount + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const scrollToItem = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [itemHeight]);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Infinite scroll hook
export function useInfiniteScroll<T>(
  items: T[],
  loadMore: () => void | Promise<void>,
  threshold: number = 100
) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - threshold) {
      setIsLoading(true);
      const result = loadMore();
      if (result && typeof result === 'object' && typeof result.finally === 'function') {
        result.finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading, hasMore, loadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isLoading, hasMore, setHasMore };
}

// Optimized list with search and filtering
interface OptimizedListProps<T> {
  items: T[];
  searchTerm: string;
  filterFn: (item: T, searchTerm: string) => boolean;
  sortFn?: (a: T, b: T) => number;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function OptimizedList<T>({
  items,
  searchTerm,
  filterFn,
  sortFn,
  renderItem,
  emptyMessage = 'Inga resultat hittades',
  className = ''
}: OptimizedListProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and sort items
  useEffect(() => {
    let result = items.filter(item => filterFn(item, debouncedSearchTerm));
    
    if (sortFn) {
      result = result.sort(sortFn);
    }
    
    setFilteredItems(result);
  }, [items, debouncedSearchTerm, filterFn, sortFn]);

  if (filteredItems.length === 0) {
    return (
      <div className={`text-center py-8 text-ink-dim ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {filteredItems.map((item, index) => (
        <div key={index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Performance optimized grid
interface OptimizedGridProps<T> {
  items: T[];
  columns: number;
  gap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function OptimizedGrid<T>({
  items,
  columns,
  gap = 4,
  renderItem,
  className = ''
}: OptimizedGridProps<T>) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap * 0.25}rem`
  };

  return (
    <div style={gridStyle} className={className}>
      {items.map((item, index) => (
        <div key={index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
