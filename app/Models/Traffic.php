<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Traffic extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'traffics';

    public function getTable()
    {
        return $this->collection;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'time',
        'requests',
    ];

    protected $casts = [
        'requests' => 'integer',
    ];

    public $timestamps = false;
}
