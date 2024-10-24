import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={handlePrevious}
        className={`px-3 py-1  text-[15px] font-bold leading-[17px] ${
          currentPage === 1 ? "text-white" : "text-black"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-[15px] font-bold leading-[17px] ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-[#092C39] text-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className={`px-3 py-1  text-[15px] font-bold leading-[17px] ${
          currentPage === totalPages ? "text-white" : "text-white"
        }`}
        disabled={currentPage === totalPages}
      >
        Next &gt;
      </button>
    </div>
  );
};
