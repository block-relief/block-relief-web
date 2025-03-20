"use client";
import { useEffect } from "react";
import useApiQuery from "@/hooks/useApiQuery";
import { getTransactions } from "@/api/dummy";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import TablePagination from "./TablePagination";
import { useAuth } from "@/hooks/AuthContext";
import PastDonation from "./PastDonationCard";

enum DonationsFilters {
  PstMonth = "Last Month",
  PastYear = "Last Year",
  TopTransactions = "Top Donations",
  ProposalOngoing = "Ongoing",
}

export default function DonationsTable() {
  const { user } = useAuth();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(15),
  );

  const [filter, setFilter] = useQueryState<DonationsFilters>(
    "filter",
    parseAsStringEnum<DonationsFilters>(Object.values(DonationsFilters)),
  );

  const [search] = useQueryState("search", parseAsString.withDefault(""));

  const { result, isLoading, error } = useApiQuery({
    queryKey: ["transactionHistory", user?._id],
    queryFn: () =>
      getTransactions(user?._id || "", {
        page,
        limit: pageSize,
        filter: filter || undefined,
        search: search || undefined,
      }),
    retry: 2,
    enabled:
      !!user && ["ngo", "admin"].some((role) => user.roles.includes(role)),
  });

  // Maybe a different form of toasting mechanism for errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {/* Blank page */}
      </div>
    );
  }

  if (!user.roles.includes("donor")) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {/* Blank page */}
      </div>
    );
  }

  const totalPages = Math.ceil((result?.totalItems || pageSize) / pageSize);

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      {/* Filters */}
      <div className="w-auto flex flex-wrap justify-start gap-4 px-4">
        <div className="flex gap-2 items-center bg-primary rounded-xl shadow-md">
          {Object.values(DonationsFilters).map((status) => (
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
      </div>

      {/* Proposals Grid */}
      <div className="space-y-6">
        {result &&
          result.data.map((donation, idx) => (
            <PastDonation key={idx} donation={donation} />
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
}
