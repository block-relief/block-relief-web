import { Flame } from "lucide-react";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useApiQuery from "@/hooks/useApiQuery";
import { disasters } from "@/api/dummy";
import { toast } from "react-toastify";
import TablePagination from "./TablePagination";
import { Skeleton } from "../ui/skeleton";
import DisasterCard from "./DisasterCard";

enum DisasterFilters {
  All = "All",
  Active = "Active",
  Resolved = "Resolved",
  Severe = "Severe",
}

enum DisasterSorts {
  Newest = "Newest",
  MostSevere = "Most Severe",
  MostDamaging = "Most Damaging",
}

export default function DisastersTable() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(15),
  );
  const [filter, setFilter] = useQueryState<DisasterFilters>(
    "filter",
    parseAsStringEnum<DisasterFilters>(
      Object.values(DisasterFilters),
    ).withDefault(DisasterFilters.All),
  );
  const [sort, setSort] = useQueryState<DisasterSorts>(
    "sort",
    parseAsStringEnum<DisasterSorts>(Object.values(DisasterSorts)).withDefault(
      DisasterSorts.Newest,
    ),
  );

  const { result, isLoading, error } = useApiQuery({
    queryKey: ["disasters", { page, pageSize, filter, sort }],
    queryFn: () => disasters({ page, limit: pageSize, filter, sort }),
    retry: 2,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const totalPages = Math.ceil((result?.totalItems || pageSize) / pageSize);

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      {/* Filters */}
      <div className="w-auto flex flex-wrap justify-start gap-4 px-4">
        <div className="flex gap-2 items-center bg-primary rounded-xl shadow-md">
          {Object.values(DisasterFilters).map((f, idx) => (
            <div
              key={idx}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-lg border-none leading-none ${
                filter === f ? "text-accent-2" : ""
              }`}
            >
              {f}
            </div>
          ))}
        </div>

        <Select onValueChange={(v) => setSort(v as DisasterSorts)}>
          <SelectTrigger className="w-48">
            <Flame className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(DisasterSorts).map((s, idx) => (
              <SelectItem key={idx} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Disasters List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="w-full h-32" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {result?.data.map((disaster, idx) => (
            <DisasterCard key={idx} disaster={disaster} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <TablePagination
          page={page}
          setPage={setPage}
          setPageSize={setPageSize}
          totalPages={totalPages}
          pageSize={pageSize}
          handlePrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
          handleNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        />
      )}
    </div>
  );
}
