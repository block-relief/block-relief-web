import { Flame, ImageIcon, MapPin } from "lucide-react";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { Card } from "../ui/card";
import { useEffect } from "react";
import { Disaster } from "@/types";
import Image from "next/image";
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
            <DisasterListItem key={idx} disaster={disaster} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <TablePagination
        page={page}
        setPage={setPage}
        setPageSize={setPageSize}
        totalPages={totalPages}
        pageSize={pageSize}
        handlePrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        handleNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
}

const DisasterListItem = ({ disaster }: { disaster: Disaster }) => {
  //const thumbnail = `https://ipfs.io/ipfs/${disaster.damageReports[0]?.ipfsCID}` || "";
  const thumbnail = `/demo/campaign_${1 + Math.floor(3 * Math.random())}.png`;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex gap-6 p-6">
        {/* Thumbnail */}
        <div className="relative w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={disaster.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{disaster.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {disaster.location.city}, {disaster.location.country}
                  </span>
                </div>
                <span>•</span>
                <span className="capitalize">
                  {disaster.type.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <StatusBadge status={disaster.status} />
            <SeverityBadge severity={disaster.severity} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status.toLowerCase() === "active"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

export const SeverityBadge = ({ severity }: { severity: string }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      severity.toLowerCase() === "high"
        ? "bg-red-100 text-red-800"
        : severity.toLowerCase() === "medium"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
    }`}
  >
    {severity} Severity
  </span>
);
