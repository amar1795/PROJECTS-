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
import { useEffect } from "react";

export function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      updateUrl(page);
    }
    console.log("this is the page", page);
  };

  // Function to update URL
  const updateUrl = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (page !== 1) {
      urlParams.set("page", page);
    } else {
      urlParams.delete("page");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
  };
  // Effect to retrieve page parameter from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const parsedPage = parseInt(pageParam, 10);
    if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
      onPageChange(parsedPage);
    } else {
      onPageChange(1); // Default to page 1 if page parameter is missing or invalid
      updateUrl(1); // Update URL to reflect the default page
    }
  }, [totalPages]); // Re-run effect when totalPages changes

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
                className={`hover:bg-black hover:text-white ${
                  currentPage === index + 1 ? "bg-black text-white" : ""
                }`}
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
