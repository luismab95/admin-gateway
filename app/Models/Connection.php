<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Connection extends Model
{

    protected $connection = 'mongodb';
    protected $collection = 'connections';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'protocol',
        'host',
        'port',
    ];

    public $timestamps = true;
}
