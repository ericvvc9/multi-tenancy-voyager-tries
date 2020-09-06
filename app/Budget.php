<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;
use Illuminate\Support\Facades\Request;

class Budget extends Model
{
    //use Translatable;

    protected $translatable = [ ];

    protected $table = 'budget';

    protected $fillable = [ 'name'];

    public function budgetItems()
    {
        return $this->hasMany('App\BudgetItem','budget');
        //return $this->belongsToMany(Voyager::modelClass('Permission'));
    }

    public function getJsonAttribute() {
        if(Request::instance()->headers->get('accept') !== 'application/json, text/plain, */*'){
            return $this->id;
        }
        //dd($this);
        $this->budgetItems;
        return $this;
    }
}
