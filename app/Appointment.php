<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Appointment extends Model
{
    use Translatable;

    //protected $translatable = ['slug', 'name'];
    protected $translatable = [];

    protected $table = 'appointments';

    protected $fillable = ['name'];

}
