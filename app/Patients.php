<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class Patients extends Model
{
    // use Translatable;

    protected $translatable = [ ];

    protected $table = 'patients';

    protected $fillable = [ 'name'];
   /*  protected $casts = [
        'diseases' => 'array',
    ]; */
    
    /* public function setDiseasesAttribute($value)
    {
        $this->attributes['diseases'] = $value->toJson();
    } */

    public function getDiseasesAttribute($value)
    {
        return json_decode($value) === null ? ((object)null):collect(json_decode($value));
    }
    public function getOdontogramaAttribute($value)
    {
        return collect(json_decode($value));
    }

}
