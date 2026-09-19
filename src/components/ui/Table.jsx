import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { cn } from "../../lib/utils";

export function Table({
  columns = [],
  data = [],
  searchKey = "",
  searchPlaceholder = "Search records...",
  actions,
  pageSize = 8,
  exportFileName = "Export"
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filteredData = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) => {
      if (searchKey && row[searchKey]) {
        return String(row[searchKey]).toLowerCase().includes(q);
      }
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(q)
      );
    });
  }, [data, query, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleExportCSV = () => {
    if (data.length === 0) return;
    const headers = columns.map((c) => c.header).join(",");
    const rows = data.map((row) =>
      columns
        .map((c) => {
          const val = row[c.accessor];
          return `"${String(val !== undefined ? val : "").replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${exportFileName}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-ink-100 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-cream-50/40 dark:bg-ink-900/40">
        <div className="w-full sm:w-72">
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            leftIcon={<Search className="w-4 h-4" />}
            className="h-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {actions}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50/50 dark:bg-ink-800/40">
              {columns.map((col) => (
                <th
                  key={col.accessor || col.header}
                  onClick={() => col.sortable && handleSort(col.accessor)}
                  className={cn(
                    "px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-400 select-none",
                    col.sortable && "cursor-pointer hover:text-gold-600",
                    col.className
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-ink-400">
                        {sortKey === col.accessor ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="w-3.5 h-3.5 text-gold-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-gold-500" />
                          )
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 opacity-30" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800 text-sm">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-ink-400"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="hover:bg-gold-50/30 dark:hover:bg-ink-800/40 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor || col.header}
                      className={cn("px-5 py-4 text-ink-800 dark:text-ink-200", col.className)}
                    >
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3.5 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-xs text-ink-500 bg-white dark:bg-ink-900">
        <div>
          Showing <span className="font-semibold">{paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{" "}
          <span className="font-semibold">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{" "}
          <span className="font-semibold">{sortedData.length}</span> results
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-2 font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
