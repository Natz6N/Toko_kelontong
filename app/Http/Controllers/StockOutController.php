<?php

namespace App\Http\Controllers;

use App\Models\StockOut;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockOutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stockOuts = StockOut::with('product')->get();
        return Inertia::render('dashboard/StockOut/index', [
            'stockOuts' => $stockOuts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('dashboard/StockOut/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'quantity' => 'required|integer|min:1',
        ]);
        StockOut::create($validated);
        return redirect()->route('stock-out.index')->with('success', 'Stock out created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stockOut = StockOut::with('product')->findOrFail($id);
        return Inertia::render('dashboard/StockOut/show', [
            'stockOut' => $stockOut,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $stockOut = StockOut::findOrFail($id);
        $products = Product::all();
        return Inertia::render('dashboard/StockOut/edit', [
            'stockOut' => $stockOut,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $stockOut = StockOut::findOrFail($id);
        $stockOut->update($validated);
        return redirect()->route('stock-out.index')->with('success', 'Stock out updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $stockOut = StockOut::findOrFail($id);
        $stockOut->delete();
        return redirect()->route('stock-out.index')->with('success', 'Stock out deleted successfully.');
    }
}
