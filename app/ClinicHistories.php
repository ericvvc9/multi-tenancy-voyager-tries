<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class ClinicHistories extends Model
{
    //use Translatable;

    protected $translatable = [ ];

    protected $table = 'clinic_histories';

    protected $fillable = [ 'name'];
    /* function getBudgetAttribute (){
        if($this->budget()->first()){
            $b = $this->budget()->first();
            $b->budgetItems;
            return json_encode($b);
            //$this->budget()->first()->budgetItems;
        }
        return "";
    }
    
    function budget() {
        return $this->hasOne('App\Budget','clinic_history');
    } */
}
