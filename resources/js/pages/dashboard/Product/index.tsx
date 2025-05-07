import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

// Definisikan tipe untuk product
interface Product {
    id: number;
    category_id: number;
    name: string;
    price: string;
    unit: string;
    category?: { name: string };
}

// Definisikan tipe untuk props
interface ProductProps {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];

export default function ProductIndex({ products }: ProductProps) {
    const [filter, setFilter] = React.useState('');
    const filteredProducts = useMemo(
        () => products.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase())),
        [products, filter],
    );
    const { delete: destroy, processing } = useForm();
    const handleDelete = (id: number) => {
        destroy(route('products.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4">
                    <label htmlFor="search" className="sr-only">
                        Search products
                    </label>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search products..."
                        className="w-full max-w-xs rounded border p-2 sm:max-w-md lg:max-w-lg"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    {/* Tabel untuk layar besar */}
                    <table className="hidden min-w-full border border-gray-200 dark:border-neutral-700 sm:table">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">ID</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">Name</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">Category</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">Price</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">Unit</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">{product.id}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">{product.name}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">{product.category?.name ?? '-'}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">{product.price}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">{product.unit}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base border-gray-200 dark:border-neutral-700">
                                            <div className="flex gap-2">
                                                <Button asChild size="sm">
                                                    <a href={route('products.edit', product.id)}>
                                                        Edit
                                                    </a>
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            Delete
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Delete Product</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this product? This action cannot be undone.
                                                        </DialogDescription>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="secondary" type="button">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button variant="destructive" type="button" disabled={processing} onClick={() => handleDelete(product.id)}>
                                                                Delete
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Kartu untuk layar kecil */}
                    <div className="space-y-4 sm:hidden">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="rounded-lg border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 p-4 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-semibold">ID:</span>
                                        <span className="text-sm">{product.id}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-sm font-semibold">Name:</span>
                                        <span className="text-sm">{product.name}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-sm font-semibold">Category:</span>
                                        <span className="text-sm">{product.category?.name ?? '-'}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-sm font-semibold">Price:</span>
                                        <span className="text-sm">{product.price}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-sm font-semibold">Unit:</span>
                                        <span className="text-sm">{product.unit}</span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button asChild size="sm">
                                            <a href={route('products.edit', product.id)}>
                                                Edit
                                            </a>
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Delete Product</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this product? This action cannot be undone.
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="secondary" type="button">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <Button variant="destructive" type="button" disabled={processing} onClick={() => handleDelete(product.id)}>
                                                        Delete
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No products found.</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
