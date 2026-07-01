import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange, start, end, total }: any) => (
  <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
    <div>
      Showing <span className="font-semibold text-gray-700">{start}</span> to{" "}
      <span className="font-semibold text-gray-700">{end}</span> of{" "}
      <span className="font-semibold text-gray-700">{total}</span> results
    </div>
    <div className="flex items-center gap-3">
      <span className="font-medium text-gray-600">Page <span className="font-bold text-gray-800">{currentPage}</span> of {totalPages || 1}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);