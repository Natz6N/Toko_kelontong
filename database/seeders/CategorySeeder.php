<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name'=>'Makanan','description'=>'Kategori makanan umum'],
            ['name'=>'Minuman','description'=>'Kategori minuman'],
            ['name'=>'Snack','description'=>'Kategori cemilan'],
        ]);
    }
}

