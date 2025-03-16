"use client";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApiQuery from "@/hooks/useApiQuery";
import { proposals } from "@/api/dummy";
import ProposalCard from "@/components/custom/ProposalCard";
import { ArrowDownUp, Loader, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import TablePagination from "./TablePagination";

enum ProposalFilters {
  All = "All",
  GoalAchieved = "Goal Achieved",
  GoalFailed = "Goal Failed",
  Ongoing = "Ongoing",
}

enum ProposalSorts {
  Newest = "Newest",
  AmountRequested = "Amount Requested",
  Trending = "Trending",
}

enum ProposalLocations {
  AllRegions = "All Regions",
  NearMe = "Near me",
}

const ProposalsTable = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(30),
  );
  const [filter, setFilter] = useQueryState<ProposalFilters>(
    "filter",
    parseAsStringEnum<ProposalFilters>(
      Object.values(ProposalFilters),
    ).withDefault(ProposalFilters.All),
  );
  const [sort, setSort] = useQueryState<ProposalSorts>(
    "sort",
    parseAsStringEnum<ProposalSorts>(Object.values(ProposalSorts)).withDefault(
      ProposalSorts.Newest,
    ),
  );
  const [location, setLocation] = useQueryState<ProposalLocations>(
    "location",
    parseAsStringEnum<ProposalLocations>(
      Object.values(ProposalLocations),
    ).withDefault(ProposalLocations.AllRegions),
  );

  const { result, isLoading, error } = useApiQuery({
    queryKey: ["proposals", { page, pageSize, filter, location, sort }],
    queryFn: () => proposals({ page, limit: pageSize, filter, location, sort }),
    retry: 2,
    enabled: true,
  });

  // Maybe a different form of toasting mechanism for errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const totalPages = Math.ceil((result?.totalItems || pageSize) / pageSize);

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      {/* Filters */}
      <div className="w-auto flex flex-wrap justify-start gap-4 px-4">
        <div className="flex gap-2 items-center bg-primary rounded-xl shadow-md">
          {["All", "Goal Achieved", "Goal Failed", "Ongoing"].map((status) => (
            <div
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-1 rounded-lg border-none leading-none ${
                filter === status ? "text-accent-2" : ""
              }`}
            >
              {status}
            </div>
          ))}
        </div>

        <Select
          onValueChange={(value) => setLocation(value as typeof location)}
        >
          <SelectTrigger className="w-48 bg-primary rounded-xl shadow-md">
            <MapPin className="w-4 h-4" />
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Regions">All Regions</SelectItem>
            <SelectItem value="Near me">Near me</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSort(value as typeof sort)}>
          <SelectTrigger className="w-48 bg-primary rounded-xl shadow-md">
            <ArrowDownUp className="w-4 h-4" />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Amount Requested">Amount Requested</SelectItem>
            <SelectItem value="Trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Proposals Grid */}
      <div className="relative flex h-full flex-wap gap-4 justify-between items-center flex-wrap p-4">
        {result &&
          result.data.map((proposal, idx) => (
            <ProposalCard key={idx} proposal={proposal} />
          ))}
        {isLoading && (
          <div className="absolute inset-0 w-full h-80 flex justify-center items-center">
            <Loader className="w-10 h-10 animate-spin" />
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <TablePagination
          page={result?.page || 1}
          pageSize={result?.limit || pageSize}
          totalPages={totalPages}
          setPage={setPage}
          setPageSize={setPageSize}
          handlePrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
          handleNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        />
      )}
    </div>
  );
};

export default ProposalsTable;
