<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class BudgetItem extends Model
{
    //use Translatable;

    protected $translatable = [ ];

    protected $table = 'budget_item';

    protected $fillable = [ 'quantity', 'price','detail_treatment'];

}
