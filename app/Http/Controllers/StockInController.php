<?php

namespace App\Http\Controllers;

use App\Models\StockIn;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stockIns = StockIn::with('product')->get();
        return Inertia::render('dashboard/StockIn/index', [
            'stockIns' => $stockIns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('dashboard/StockIn/create', [
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
            'expired_date' => 'nullable|date',
        ]);
        StockIn::create($validated);
        return redirect()->route('stock-in.index')->with('success', 'Stock in created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stockIn = StockIn::with('product')->findOrFail($id);
        return Inertia::render('dashboard/StockIn/show', [
            'stockIn' => $stockIn,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $stockIn = StockIn::findOrFail($id);
        $products = Product::all();
        return Inertia::render('dashboard/StockIn/edit', [
            'stockIn' => $stockIn,
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
            'expired_date' => 'nullable|date',
        ]);
        $stockIn = StockIn::findOrFail($id);
        $stockIn->update($validated);
        return redirect()->route('stock-in.index')->with('success', 'Stock in updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $stockIn = StockIn::findOrFail($id);
        $stockIn->delete();
        return redirect()->route('stock-in.index')->with('success', 'Stock in deleted successfully.');
    }
}
