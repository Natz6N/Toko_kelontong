<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'price', 'unit'];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function stockIns()
    {
        return $this->hasMany(StockIn::class);
    }
    public function stockOuts()
    {
        return $this->hasMany(StockOut::class);
    }
    public function expirations()
    {
        return $this->hasMany(ProductExpiration::class);
    }
}
