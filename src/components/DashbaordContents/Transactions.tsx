'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CsvExporter } from '../features/CsvExporter';
import { CsvImporter } from '../features/CsvImporter';

const ITEMS_PER_PAGE = 5;

interface Transaction {
  id: number;
  customerName: string;
  amount: number;
  status: string;
  createdAt: Date;
}

const transactionData: Transaction[] = [
  {
    id: 1,
    customerName: 'John Doe',
    amount: 299.99,
    status: 'Pending',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    amount: 499.99,
    status: 'Completed',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 3,
    customerName: 'Alice Johnson',
    amount: 129.99,
    status: 'Shipped',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 4,
    customerName: 'Bob Brown',
    amount: 79.99,
    status: 'Cancelled',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 5,
    customerName: 'Charlie Davis',
    amount: 199.99,
    status: 'Pending',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 6,
    customerName: 'Diana Evans',
    amount: 299.99,
    status: 'Completed',
    createdAt: new Date('2024-01-20'),
  },
];

export const TransactionsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [transactions, setTransactions] = useState<Transaction[]>(transactionData);

  const statuses = [
    ...Array.from(new Set(transactionData.map((transaction) => transaction.status))),
  ];

  const filteredTransactions = transactionData.filter((transaction) => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesDate =
      date?.from && date?.to
        ? transaction.createdAt >= date.from && transaction.createdAt <= date.to
        : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStatus, date]);

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedItems((prev) =>
      prev.length === paginatedTransactions.length ? [] : paginatedTransactions.map((o) => o.id)
    );
  };

  const handleImport = (importedData: any[]) => {
    setTransactions(importedData);
  };

  return (
    <div className="space-y-4 p-2 sm:p-6 lg:space-y-6 lg:p-8 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">Transactions</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">Manage your transactions</p>
        </div>
        <div className="flex gap-2">
          <CsvImporter onImport={handleImport} />
          <CsvExporter rawData={transactions} />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                    className="sm:numberOfMonths-2"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] sm:w-[50px]">
                  <Checkbox
                    checked={
                      selectedItems.length === paginatedTransactions.length &&
                      paginatedTransactions.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="min-w-[120px]">Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={`hover:bg-muted/50 ${
                    selectedItems.includes(transaction.id) ? 'bg-muted/50' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(transaction.id)}
                      onCheckedChange={() => toggleSelection(transaction.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col sm:hidden">
                      <span>{transaction.customerName}</span>
                      <span className="text-xs text-muted-foreground">{transaction.status}</span>
                    </div>
                    <span className="hidden sm:inline">{transaction.customerName}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(transaction.createdAt, 'LLL dd, y')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-t px-2 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs sm:text-sm text-muted-foreground">
              Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
