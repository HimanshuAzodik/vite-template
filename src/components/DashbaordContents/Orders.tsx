'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
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
import { Order, OrderState } from '@/interfaces';
import { cn } from '@/lib/utils';
import { CsvExporter } from '../features/CsvExporter';
import { CsvImporter } from '../features/CsvImporter';

const ITEMS_PER_PAGE = 5;

const orderData: Order[] = [
  {
    id: 1,
    customerName: 'John Doe',
    totalAmount: 299.99,
    status: 'Pending',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    totalAmount: 499.99,
    status: 'Completed',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 3,
    customerName: 'Alice Johnson',
    totalAmount: 129.99,
    status: 'Shipped',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 4,
    customerName: 'Bob Brown',
    totalAmount: 79.99,
    status: 'Cancelled',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 5,
    customerName: 'Charlie Davis',
    totalAmount: 199.99,
    status: 'Pending',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 6,
    customerName: 'Diana Evans',
    totalAmount: 299.99,
    status: 'Completed',
    createdAt: new Date('2024-01-20'),
  },
];

export const OrdersPage = () => {
  const [orders, setOrders] = React.useState<Order[]>(orderData);
  const [state, setState] = React.useState<OrderState>({
    search: '',
    selectedStatus: 'all',
    currentPage: 1,
    selectedItems: [],
    date: { from: undefined, to: undefined },
    isModalOpen: false,
  });

  const statuses = useMemo(
    () => Array.from(new Set(orders.map((order) => order.status))).filter(Boolean),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.customerName.toLowerCase().includes(state.search.toLowerCase());
      const matchesStatus = state.selectedStatus === 'all' || order.status === state.selectedStatus;
      const matchesDate =
        state.date?.from && state.date?.to
          ? order.createdAt >= state.date.from && order.createdAt <= state.date.to
          : true;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [state.search, state.selectedStatus, state.date, orders]);

  const paginatedOrders = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, state.currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const toggleSelection = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter((item) => item !== id)
        : [...prev.selectedItems, id],
    }));
  }, []);

  const toggleAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedItems:
        prev.selectedItems.length === paginatedOrders.length
          ? []
          : paginatedOrders.map((o) => o.id),
    }));
  }, [paginatedOrders]);

  useEffect(() => {
    setState((prev) => ({ ...prev, currentPage: 1 }));
  }, [state.search, state.selectedStatus, state.date]);

  return (
    <div className="space-y-4 p-2 sm:p-6 lg:space-y-6 lg:p-8 w-full ">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">Orders</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Manage your orders and transactions
          </p>
        </div>
        <div className="flex gap-5">
          <CsvExporter rawData={filteredOrders} />
          <CsvImporter
            onImport={(importedData) => {
              const newOrders = importedData.map((item) => ({
                id: item.id,
                customerName: item.customerName,
                totalAmount: item.totalAmount ?? 0,
                status: item.status || 'Pending',
                createdAt: item.createdAt instanceof Date ? item.createdAt : new Date(),
              }));

              console.log('Imported orders:', newOrders);
              setOrders((prev) => [...prev, ...newOrders]);
            }}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search orders..."
              value={state.search}
              onChange={(e) => setState((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full"
            />
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Select
                value={state.selectedStatus}
                onValueChange={(value) => setState((prev) => ({ ...prev, selectedStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(
                    (status) =>
                      status && (
                        <SelectItem key={status} value={status || 'unknown'}>
                          {status || 'Unknown'}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !state.date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state.date?.from ? (
                      state.date.to ? (
                        <>
                          {format(state.date.from, 'LLL dd, y')} -{' '}
                          {format(state.date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(state.date.from, 'LLL dd, y')
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
                    defaultMonth={state.date?.from}
                    selected={state.date}
                    onSelect={(date) =>
                      setState((prev) => ({
                        ...prev,
                        date: { from: date?.from, to: date?.to },
                      }))
                    }
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
                      state.selectedItems.length === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="min-w-[120px]">Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className={`hover:bg-muted/50 ${
                    state.selectedItems.includes(order.id) ? 'bg-muted/50' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={state.selectedItems.includes(order.id)}
                      onCheckedChange={() => toggleSelection(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col sm:hidden">
                      <span>{order.customerName}</span>
                      <span className="text-xs text-muted-foreground">{order.status}</span>
                    </div>
                    <span className="hidden sm:inline">{order.customerName}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(order.createdAt, 'LLL dd, y')}
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
              Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    currentPage: state.currentPage - 1,
                  }))
                }
                disabled={state.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Page {state.currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    currentPage: state.currentPage + 1,
                  }))
                }
                disabled={state.currentPage === totalPages}
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
