import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CsvExporterProps {
  rawData: Record<string, any>[];
  className?: string;
}

export const CsvExporter = ({ rawData, className }: CsvExporterProps) => {
  const handleExport = useCallback(() => {
    try {
      const header = [
        'ID',
        'Customer Name',
        'Product Name',
        'Brand',
        'Description',
        'Category',
        'Status',
        'Created At',
      ];

      const escapeCsvField = (field: string | number | Date | undefined) => {
        const stringField = String(field || '');
        return stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')
          ? `"${stringField.replace(/"/g, '""')}"`
          : stringField;
      };

      const csvData = rawData.map((order) => [
        order.id,
        escapeCsvField(order.customerName),
        escapeCsvField(order.productName),
        escapeCsvField(order.brand),
        escapeCsvField(order.description),
        escapeCsvField(order.category),
        order.status,
        format(order.createdAt, 'LLL dd, y'),
      ]);

      const csvContent = [header.join(','), ...csvData.map((row) => row.join(','))].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = `orders-${format(new Date(), 'LLL dd, y')}.csv`;
      link.click();
    } catch (error) {
      console.error('Failed to export CSV:', error);
    }
  }, [rawData]);

  return (
    <div className={className}>
      <Button onClick={handleExport} variant="outline" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Export Data
      </Button>
    </div>
  );
};
