import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
};

export default function TablePagination({
  page,
  pageSize,
  totalPages,
  setPage,
  setPageSize,
  handlePrevious,
  handleNext,
}: TablePaginationProps) {
  const displayingPageNumbers = [];
  if (page - 2 >= 1) displayingPageNumbers.push(page - 2);
  if (page - 1 >= 1) displayingPageNumbers.push(page - 1);
  displayingPageNumbers.push(page);
  if (page + 1 <= totalPages) displayingPageNumbers.push(page + 1);
  if (page + 2 <= totalPages) displayingPageNumbers.push(page + 2);

  return (
    <div className="flex flex-col px-4 gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[100px] bg-primary text-muted-foreground rounded-xl shadow-md">
            <SelectValue
              placeholder={pageSize}
              className="text-muted-foreground"
            />
          </SelectTrigger>
          <SelectContent>
            {[15, 20, 30, 50, 90].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>

      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                isActive={page !== 1}
                className="cursor-pointer"
              />
            </PaginationItem>
            {displayingPageNumbers[0] > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {displayingPageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber} className="cursor-pointer">
                <PaginationLink
                  isActive={page === pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {displayingPageNumbers[displayingPageNumbers.length - 1] <
              totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                isActive={page !== totalPages}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
