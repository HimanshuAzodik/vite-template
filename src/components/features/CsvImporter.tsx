import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { parse } from 'papaparse';
import { Button } from '@/components/ui/button';

interface CsvImporterProps {
  onImport: (
    data: {
      id: number;
      customerName: string;
      status: string;
      createdAt: Date;
      totalAmount?: number;
    }[]
  ) => void;
  className?: string;
}

export const CsvImporter = ({ onImport, className }: CsvImporterProps) => {
  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      event.target.value = '';

      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            console.log('Raw CSV Data:', results.data);
            console.log('CSV Headers:', results.meta.fields);

            if (results.data.length === 0) {
              throw new Error('CSV file is empty');
            }

            const parsedData = results.data.map((row: any, index: number) => {
              console.log(`Processing row ${index + 1}:`, row);

              const customerName = row['Customer Name'] || row['Product Name'];
              if (!customerName) {
                throw new Error(
                  `Missing Customer Name at row ${
                    index + 1
                  }. Please make sure either "Customer Name" or "Product Name" column is filled.`
                );
              }

              const id = Number(row['ID']);
              if (isNaN(id)) {
                throw new Error(`Invalid ID at row ${index + 1}`);
              }

              const parsedRow = {
                id,
                customerName,
                status: row['Status'] || 'Pending',
                createdAt: new Date(row['Created At'] || new Date()),
                totalAmount: 0,
              };

              console.log(`Parsed row ${index + 1}:`, parsedRow);
              return parsedRow;
            });

            console.log('Final parsed data:', parsedData);
            onImport(parsedData);
          } catch (error) {
            console.error('CSV parsing error:', error);
          }
        },
        error: (error) => {
          console.error('CSV reading error:', error);
        },
      });
    },
    [onImport]
  );

  return (
    <div className={className}>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => document.getElementById('csv-file-input')?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Import Data
      </Button>
      <input
        id="csv-file-input"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
};
