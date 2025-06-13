<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Services extends Model
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
        'middlewares',
    ];

    protected $casts = [
        'status' => 'boolean',
        'port' => 'integer',
        // 'middlewares' => 'array',
    ];

    public $timestamps = true;
}
