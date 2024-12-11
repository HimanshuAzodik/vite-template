'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
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
import { AddProductModal } from './modals/AddProductModal';

const ITEMS_PER_PAGE = 5;

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  createdAt: Date;
}

const productData: Product[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 999,
    category: 'Electronics',
    brand: 'Apple',
    description: 'Latest flagship smartphone with premium features',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'MacBook Air',
    price: 1299,
    category: 'Electronics',
    brand: 'Apple',
    description: 'Lightweight laptop with M2 chip',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 3,
    name: 'Nike Air Max',
    price: 129,
    category: 'Footwear',
    brand: 'Nike',
    description: 'Comfortable running shoes',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 4,
    name: 'Coffee Maker',
    price: 79,
    category: 'Home',
    brand: 'Philips',
    description: 'Automatic drip coffee maker',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 5,
    name: 'Gaming Chair',
    price: 299,
    category: 'Furniture',
    brand: 'DXRacer',
    description: 'Ergonomic gaming chair with lumbar support',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 199,
    category: 'Electronics',
    brand: 'Samsung',
    description: 'Fitness tracking smartwatch',
    createdAt: new Date('2024-01-20'),
  },
];

export const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(productData);

  const categories = [...Array.from(new Set(productData.map((product) => product.category)))];
  const brands = Array.from(new Set(productData.map((product) => product.brand)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesDate =
      date?.from && date?.to
        ? product.createdAt >= date.from && product.createdAt <= date.to
        : true;
    return matchesSearch && matchesCategory && matchesBrand && matchesDate;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand, date]);

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedItems((prev) =>
      prev.length === paginatedProducts.length ? [] : paginatedProducts.map((p) => p.id)
    );
  };

  const handleAddProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct = {
      ...product,
      id: productData.length + 1,
      createdAt: new Date(),
    };
    productData.push(newProduct);
  };

  const formatDataForExport = () => {
    return products.map((product) => ({
      id: product.id,
      customerName: product.name,
      productName: product.name,
      brand: product.brand,
      description: product.description,
      category: product.category,
      status: 'N/A',
      createdAt: product.createdAt,
      price: product.price,
    }));
  };

  const handleImport = (importedData: any[]) => {
    const formattedData = importedData.map((item) => ({
      id: item.id,
      name: item.productName || item.name,
      price: Number(item.price) || 0,
      category: item.category || 'Uncategorized',
      brand: item.brand || 'Unknown',
      description: item.description || '',
      createdAt: new Date(item.createdAt || new Date()),
    }));
    setProducts(formattedData);
  };

  return (
    <div className="space-y-4 p-2 sm:p-6 lg:space-y-6 lg:p-8 w-full ">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">Products</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Manage your products and inventory
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>

          <div className="flex gap-3">
            <CsvImporter onImport={handleImport} />
            <CsvExporter rawData={formatDataForExport()} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
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
                      selectedItems.length === paginatedProducts.length &&
                      paginatedProducts.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Brand</TableHead>
                <TableHead className="hidden lg:table-cell">Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={`hover:bg-muted/50 ${
                    selectedItems.includes(product.id) ? 'bg-muted/50' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(product.id)}
                      onCheckedChange={() => toggleSelection(product.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col sm:hidden">
                      <span>{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.category} • {product.brand}
                      </span>
                    </div>
                    <span className="hidden sm:inline">{product.name}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{product.brand}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {product.description}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(product.createdAt, 'LLL dd, y')}
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
              Showing {paginatedProducts.length} of {filteredProducts.length} products
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
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};
