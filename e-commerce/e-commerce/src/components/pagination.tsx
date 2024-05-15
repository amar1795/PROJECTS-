import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export function PaginationComponent() {
    return (
      <div className=" mt-5 mb-3">
        <Pagination >
        <PaginationContent className=" w-[30rem] flex justify-between ">
          <div className="first">
          <PaginationItem  >
            <PaginationPrevious href="#" className=" hover:bg-black hover:text-white"/>
          </PaginationItem>
          </div>
          <div className="mid flex">
          <PaginationItem>
            <PaginationLink href="#" className=" hover:bg-black hover:text-white" >1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className=" hover:bg-black hover:text-white" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className=" hover:bg-black hover:text-white">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          </div>
          <div className="last">
          <PaginationItem >
            <PaginationNext href="#" className=" hover:bg-black hover:text-white"/>
          </PaginationItem>
          </div>
        </PaginationContent>
      </Pagination>
      </div>
    )
  }
  