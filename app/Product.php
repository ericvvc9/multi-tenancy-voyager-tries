<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Product extends Model
{
    use Translatable;

    //protected $translatable = ['slug', 'name'];
    protected $translatable = [];

    protected $table = 'product';

    protected $fillable = ['name'];

}
