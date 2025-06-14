<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Service extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'services';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'protocol',
        'host',
        'port',
        'route',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
        'port' => 'integer',
    ];

    public $timestamps = true;
}
