'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EsriData } from '@/model/esri';

type Direction = 'ascending' | 'descending' | null;

export interface EsriTableProps {
  data: EsriData[];
}

export function EsriTable({ data }: EsriTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EsriData | null;
    direction: Direction;
  }>({ key: null, direction: null });
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
    setSortConfig({ key: null, direction: null });
  }, [data]);

  // Handle sorting
  const requestSort = (key: keyof EsriData) => {
    let direction: Direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered data
  const sortedAndFilteredData = useMemo(() => {
    // First filter the data
    let filteredData = [...data];
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.Crop_Name.toLowerCase().includes(lowerCaseSearch) ||
          item.Season.toLowerCase().includes(lowerCaseSearch) ||
          item.Country.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Then sort the data
    if (sortConfig.key && sortConfig.direction) {
      filteredData.sort((a, b) => {
        let aValue = a[sortConfig.key as keyof EsriData];
        let bValue = b[sortConfig.key as keyof EsriData];

        // Special handling for totalAmount to sort numerically
        if (sortConfig.key === 'Volume_kg') {
          aValue = Number.parseFloat(aValue.toString());
          bValue = Number.parseFloat(bValue.toString());
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortConfig.direction, sortConfig.key]);

  // Reset to first page when search or sort changes
  useMemo(() => {
    setCurrentPage(1);
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Page navigation functions
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Get sort icon for column header
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="ml-2 h-4 w-4" />;
    }
    if (sortConfig.direction === 'descending') {
      return <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end mb-4">
        {/* <h2 className="text-lg font-semibold">Invoices</h2> */}
        <div className="relative w-full xl:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[430px] flex flex-col">
        <Table>
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => requestSort('PD_ID')}>
                <div className="flex items-center">
                  PD_ID
                  {getSortIcon('PD_ID')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('Crop_Name')}>
                <div className="flex items-center">
                  Crop_Name
                  {getSortIcon('Crop_Name')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('Volume_kg')}>
                <div className="flex items-center">
                  Volume_kg
                  {getSortIcon('Volume_kg')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('Season')}>
                <div className="flex items-center justify-end">
                  Season
                  {getSortIcon('Season')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <TableRow className="border-b-0" key={item.PD_ID}>
                  <TableCell className="font-medium">{item.PD_ID}</TableCell>
                  <TableCell>{item.Crop_Name}</TableCell>
                  <TableCell>{item.Volume_kg}</TableCell>
                  <TableCell className="text-right">{item.Season}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center text-muted-foreground">No results found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Current Page Total</TableCell>
            <TableCell className="text-right">${currentPageTotal.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </div>

      {sortedAndFilteredData.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground hidden xl:block">
            Showing page {currentPage} of {totalPages} ({sortedAndFilteredData.length}{' '}
            {sortedAndFilteredData.length === 1 ? 'result' : 'results'})
          </div>
          <div className="flex items-center space-x-2 mx-auto xl:mx-0">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageToShow;
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageToShow}
                    variant={currentPage === pageToShow ? 'default' : 'outline'}
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => goToPage(pageToShow)}
                  >
                    {pageToShow}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
