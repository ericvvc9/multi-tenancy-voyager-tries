<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Budget extends Model
{
    //use Translatable;

    protected $translatable = [ ];

    protected $table = 'budget';

    protected $fillable = [ 'name'];

}
