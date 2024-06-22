"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

export function PaginationComponent({currentOrderPage, totalPages, onPageChange }) {

  const [currentPage, setCurrentPage] = useState(currentOrderPage);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentOrderPage);
    window.history.pushState({}, "", `${window.location.pathname}?${urlParams}`);

    setCurrentPage(currentOrderPage)

  }, []);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updateUrl(page);
      onPageChange(page); // Notify parent component about page change

    }
  };

  // Function to update URL
  const updateUrl = (page) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (page !== 1) {
      urlParams.set("page", page.toString());
    } else {
      urlParams.delete("page");
    }
    window.history.pushState({}, "", `${window.location.pathname}?${urlParams}`);
  };


  return (
    <div className=" mt-5 mb-3">
      <Pagination>
        <PaginationContent className=" w-[30rem] flex justify-between ">

          {/* previous Button */}
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

        {/* middle small Buttons */}
          <div className="mid flex">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`hover:bg-black hover:text-white ${
                  currentPage === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                <PaginationItem>
                  <PaginationLink
                    
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

          {/* next Button */}
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
