'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

const data: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Phones, Laptops, Tablets, Cameras, and other gadgets',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Clothing, Shoes, Accessories, Jewelry',
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    description: 'Furniture, Appliances, Kitchen items, Home decor',
    createdAt: '2024-01-17',
  },
  {
    id: '4',
    name: 'Beauty & Personal Care',
    description: 'Makeup, Skincare, Hair care, Personal hygiene',
    createdAt: '2024-01-18',
  },
  {
    id: '5',
    name: 'Sports & Fitness',
    description: 'Exercise equipment, Sports gear, Outdoor activities',
    createdAt: '2024-01-19',
  },
  {
    id: '6',
    name: 'Books & Stationery',
    description: 'Books, Notebooks, Office supplies',
    createdAt: '2024-01-20',
  },
  {
    id: '7',
    name: 'Toys & Games',
    description: 'Kids toys, Board games, Gaming accessories',
    createdAt: '2024-01-21',
  },
  {
    id: '8',
    name: 'Automotive',
    description: 'Car accessories, Tools, Spare parts',
    createdAt: '2024-01-22',
  },
  {
    id: '9',
    name: 'Health & Wellness',
    description: 'Supplements, Medical supplies, Health monitors',
    createdAt: '2024-01-23',
  },
  {
    id: '10',
    name: 'Food & Beverages',
    description: 'Groceries, Snacks, Drinks, Organic food',
    createdAt: '2024-01-24',
  },
];

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

export const CategoriesPage = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setOpen(false);
    form.reset();
  }

  return (
    <div className="space-y-4 p-2 sm:p-6 lg:space-y-6 lg:p-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Category description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
