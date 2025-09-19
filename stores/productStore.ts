import { create } from 'zustand';

interface ProductPaginationState {
  currentPage: number;
  totalPages: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setLimit: (limit: number) => void;
}

const useProductPagination = create<ProductPaginationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  limit: 20,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setLimit: (limit) => set({ limit }),
}));

export default useProductPagination;
