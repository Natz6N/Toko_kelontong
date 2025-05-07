import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useMemo } from 'react';

// Definisikan tipe untuk category
interface Category {
    id: number;
    name: string;
    description: string;
}

// Definisikan tipe untuk props
interface CategoryProps {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: route('categories.index'),
    },
];

export default function Category({ categories }: CategoryProps) {
    const [filter, setFilter] = React.useState('');
    const filteredCategories = useMemo(
        () => categories.filter((category) => category.name.toLowerCase().includes(filter.toLowerCase())),
        [categories, filter],
    );
    const { delete: destroy, processing } = useForm();
    const handleDelete = (id: number) => {
        destroy(route('categories.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex w-full items-center justify-between">
                    <div className="mb-4">
                        <label htmlFor="search" className="sr-only">
                            Search categories
                        </label>
                        {/* Input pencarian */}
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search categories..."
                            className="w-full max-w-xs rounded border p-2 sm:max-w-md lg:max-w-lg"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <Link href={route('categories.create')} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-offset-2 dark:bg-primary dark:text-white">
                        Tambah Kategori
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    {/* Tabel untuk layar besar */}
                    <table className="hidden min-w-full border border-gray-200 sm:table dark:border-neutral-700">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">ID</th>
                                <th className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                    Name
                                </th>
                                <th className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                    Description
                                </th>
                                <th className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                                        <td className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                            {category.id}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                            {category.name}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                            {category.description}
                                        </td>
                                        <td className="border border-gray-200 px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base dark:border-neutral-700">
                                            <div className="flex gap-2">
                                                <Button asChild size="sm">
                                                    <a href={route('categories.edit', category.id)}>Edit</a>
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            Delete
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Delete Category</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this category? This action cannot be undone.
                                                        </DialogDescription>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="secondary" type="button">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                variant="destructive"
                                                                type="button"
                                                                disabled={processing}
                                                                onClick={() => handleDelete(category.id)}
                                                            >
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
                                    <td colSpan={3} className="py-4 text-center text-sm text-gray-500 sm:text-base dark:text-gray-400">
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Kartu untuk layar kecil */}
                    <div className="space-y-4 sm:hidden">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
                                >
                                    <div className="flex justify-between">
                                        <span className="text-sm font-semibold">ID:</span>
                                        <span className="text-sm">{category.id}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-sm font-semibold">Name:</span>
                                        <span className="text-sm">{category.name}</span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-semibold">Description:</span>
                                        <p className="mt-1 text-sm">{category.description}</p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button asChild size="sm">
                                            <a href={route('categories.edit', category.id)}>Edit</a>
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Delete Category</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this category? This action cannot be undone.
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="secondary" type="button">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        variant="destructive"
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={() => handleDelete(category.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No categories found.</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
