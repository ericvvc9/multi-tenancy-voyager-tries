<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Agreements extends Model
{
    //use Translatable;

    //protected $translatable = [ 'name'];

    protected $table = 'agreements';

    protected $fillable = [ 'name'];

}
