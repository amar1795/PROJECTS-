"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <div className=" mt-5 mb-3">
      <Pagination>
        <PaginationContent className=" w-[30rem] flex justify-between ">
          <div className="first previous">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="hover:bg-black hover:text-white"
            >
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className=" hover:bg-black hover:text-white"
                />
              </PaginationItem>
            </button>
          </div>
          <div className="mid flex">


          {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`hover:bg-black hover:text-white ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
          >
               <PaginationItem>
              <PaginationLink
                href="#"
                className=" hover:bg-black hover:text-white"
              >
            {index + 1}
                
              </PaginationLink>
            </PaginationItem>
          </button>
        ))}
         
            
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
          </div>
          <div className="last next">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="hover:bg-black hover:text-white"
            >
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className=" hover:bg-black hover:text-white"
                />
              </PaginationItem>
            </button>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
