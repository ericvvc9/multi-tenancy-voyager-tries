<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class ClinicHistories extends Model
{
    //use Translatable;

    protected $translatable = [ ];

    protected $table = 'budget_item';

    protected $fillable = [ 'name'];

}
