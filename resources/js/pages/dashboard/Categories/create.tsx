import { useForm, Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Categories', href: route('categories.index') },
  { title: 'Create', href: '#' },
];

export default function CreateCategory() {
  const pageProps = usePage().props as unknown as { flash?: { success?: string; error?: string }, errors?: Record<string, string> };
  const flash = pageProps.flash || {};
  const errors = pageProps.errors || {};
  const { data, setData, post, processing, reset } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('categories.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />
      <div className="mx-auto max-w-lg p-4 sm:p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold">Create Category</h1>
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
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required autoFocus />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <Input id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={processing}>Create</Button>
            <Button type="button" variant="secondary" onClick={() => router.visit(route('categories.index'))}>Cancel</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
