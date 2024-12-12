'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

const categorySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

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

const CategoryForm: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = useCallback(
    (values: CategoryFormValues) => {
      console.log(values);
      setOpen(false);
      form.reset();
    },
    [setOpen, form]
  );

  return (
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
  );
};

const CategoryTable: React.FC<{
  categories: Category[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}> = ({ categories, selectedItems, setSelectedItems }) => {
  const toggleSelection = (id: string) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id]
    );
  };

  const toggleAll = () => {
    setSelectedItems(selectedItems.length === categories.length ? [] : categories.map((c) => c.id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px] sm:w-[50px]">
            <Checkbox
              checked={selectedItems.length === categories.length && categories.length > 0}
              onCheckedChange={toggleAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category.id}
            className={`hover:bg-muted/50 ${selectedItems.includes(category.id) ? 'bg-muted/50' : ''}`}
          >
            <TableCell>
              <Checkbox
                checked={selectedItems.includes(category.id)}
                onCheckedChange={() => toggleSelection(category.id)}
              />
            </TableCell>
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
  );
};

const PaginationComponent: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink onClick={() => onPageChange(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const CategoriesPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const itemsPerPage = 5;

  // Add filter function
  const filteredData = data.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Deleting items:', selectedItems);
    setSelectedItems([]); // Clear selection after delete
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="space-y-4 p-2 sm:p-6 lg:space-y-6 lg:p-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete Selected ({selectedItems.length})
            </Button>
          )}
          <CategoryForm open={open} setOpen={setOpen} />
        </div>
      </div>

      {/* Add Filters Section */}
      <div className="rounded-lg border bg-card">
        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <CategoryTable
        categories={currentData}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
