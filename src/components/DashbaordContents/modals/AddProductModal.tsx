'use client';

import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { X } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/interfaces';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  categories: string[];
  brands: string[];
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  description: Yup.string().required('Description is required'),
  weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
  length: Yup.number().required('Length is required').positive('Length must be positive'),
  breadth: Yup.number().required('Breadth is required').positive('Breadth must be positive'),
  width: Yup.number().required('Width is required').positive('Width must be positive'),
  sellingOption: Yup.string()
    .oneOf(['in-store', 'online', 'both'])
    .required('Selling option is required'),
  scheduledDate: Yup.date().nullable(),
});

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  brands,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    setImages((prevImages) => [...prevImages, ...newFiles]);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => {
      URL.revokeObjectURL(prevUrls[index]);
      return prevUrls.filter((_, i) => i !== index);
    });
  };

  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const initialValues = {
    name: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    weight: '',
    length: '',
    breadth: '',
    width: '',
    sellingOption: 'both',
    scheduledDate: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const product = {
      ...values,
      price: Number(values.price),
      weight: Number(values.weight),
      length: Number(values.length),
      breadth: Number(values.breadth),
      width: Number(values.width),
      images,
      scheduledDate: values.scheduledDate ? new Date(values.scheduledDate) : undefined,
    };
    onSubmit({
      ...product,
      sellingOption: product.sellingOption as 'in-store' | 'online' | 'both',
    });

    resetForm();
    setImages([]);
    setPreviewUrls([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    className={errors.price && touched.price ? 'border-red-500' : ''}
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Field name="category">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: string;
                        onChange: (value: string) => void;
                      };
                    }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger
                          className={errors.category && touched.category ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.category && touched.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Field name="brand">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: string;
                        onChange: (value: string) => void;
                      };
                    }) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger
                          className={errors.brand && touched.brand ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  {errors.brand && touched.brand && (
                    <p className="text-red-500 text-sm">{errors.brand}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Item weight (kg)</Label>
                  <Field
                    as={Input}
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    className={errors.weight && touched.weight ? 'border-red-500' : ''}
                  />
                  {errors.weight && touched.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Field
                    as={Input}
                    id="length"
                    name="length"
                    type="number"
                    className={errors.length && touched.length ? 'border-red-500' : ''}
                  />
                  {errors.length && touched.length && (
                    <p className="text-red-500 text-sm">{errors.length}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breadth">Breadth (cm)</Label>
                  <Field
                    as={Input}
                    id="breadth"
                    name="breadth"
                    type="number"
                    className={errors.breadth && touched.breadth ? 'border-red-500' : ''}
                  />
                  {errors.breadth && touched.breadth && (
                    <p className="text-red-500 text-sm">{errors.breadth}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Field
                    as={Input}
                    id="width"
                    name="width"
                    type="number"
                    className={errors.width && touched.width ? 'border-red-500' : ''}
                  />
                  {errors.width && touched.width && (
                    <p className="text-red-500 text-sm">{errors.width}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Selling Option</Label>
                <Field name="sellingOption">
                  {({ field }: any) => (
                    <RadioGroup
                      {...field}
                      defaultValue="both"
                      className={
                        errors.sellingOption && touched.sellingOption ? 'border-red-500' : ''
                      }
                    >
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-store" id="in-store" />
                          <Label htmlFor="in-store">In-store only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online selling only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both in-store and online</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                </Field>
                {errors.sellingOption && touched.sellingOption && (
                  <p className="text-red-500 text-sm">{errors.sellingOption}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="images"
                  />
                  <Label htmlFor="images" className="cursor-pointer">
                    Click to upload or drag and drop
                    <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </Label>
                  {images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">
                        {images.length} {images.length === 1 ? 'image' : 'images'} selected
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square group">
                            <img
                              width={800}
                              height={400}
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 
                                   text-white rounded-full p-1.5 
                                   transition-all duration-200 ease-in-out"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  className={errors.description && touched.description ? 'border-red-500' : ''}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="scheduledDate">Schedule</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSchedule(!showSchedule)}
                  >
                    {showSchedule ? 'Hide Schedule' : 'Set Schedule'}
                  </Button>
                </div>
                {showSchedule && (
                  <Field
                    as={Input}
                    type="datetime-local"
                    id="scheduledDate"
                    name="scheduledDate"
                    className={
                      errors.scheduledDate && touched.scheduledDate ? 'border-red-500' : ''
                    }
                  />
                )}
              </div>
              <DialogFooter className="space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Discard
                </Button>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
