import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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

    // Optimalkan filter dengan useMemo
    const filteredCategories = useMemo(
        () => categories.filter((category) => category.name.toLowerCase().includes(filter.toLowerCase())),
        [categories, filter],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-4 sm:p-6 lg:p-8">
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

                <div className="overflow-x-auto">
                    {/* Tabel untuk layar besar */}
                    <table className="hidden min-w-full border border-gray-200 sm:table">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">ID</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">Name</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">Description</th>
                                <th className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">{category.id}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">{category.name}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">{category.description}</td>
                                        <td className="border px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="py-4 text-center text-sm text-gray-500 sm:text-base">
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
                                <div key={category.id} className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
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
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500">No categories found.</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
