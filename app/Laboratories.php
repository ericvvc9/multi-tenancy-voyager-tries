<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Laboratories extends Model
{
    //use Translatable;

    //protected $translatable = [];

    protected $table = 'laboratories';

    protected $fillable = ['name'];

}
