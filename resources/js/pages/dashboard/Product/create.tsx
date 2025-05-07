import { useForm, Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

interface Category { id: number; name: string; }

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Products', href: route('products.index') },
  { title: 'Create', href: '#' },
];

export default function CreateProduct({ categories }: { categories: Category[] }) {
  const pageProps = usePage().props as unknown as { flash?: { success?: string; error?: string }, errors?: Record<string, string> };
  const flash = pageProps.flash || {};
  const errors = pageProps.errors || {};
  const { data, setData, post, processing, reset } = useForm({
    category_id: '',
    name: '',
    price: '',
    unit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('products.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Product" />
      <div className="mx-auto max-w-lg p-4 sm:p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold">Create Product</h1>
        {flash.success && (
          <Alert className="mb-4" variant="default">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        )}
        {flash.error && (
          <Alert className="mb-4" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{flash.error}</AlertDescription>
          </Alert>
        )}
        {Object.keys(errors).length > 0 && (
          <Alert className="mb-4" variant="destructive">
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {Object.entries(errors).map(([key, msg]) => (
                  <li key={key}>{msg as string}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium mb-1">Category</label>
            <Select value={data.category_id} onValueChange={v => setData('category_id', v)}>
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required autoFocus />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
            <Input id="price" type="number" min="0" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} required />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium mb-1">Unit</label>
            <Input id="unit" value={data.unit} onChange={e => setData('unit', e.target.value)} required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={processing}>Create</Button>
            <Button type="button" variant="secondary" onClick={() => router.visit(route('products.index'))}>Cancel</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
