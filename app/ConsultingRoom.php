<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class ConsultingRoom extends Model
{
    use Translatable;

    //protected $translatable = [ 'name'];
    protected $translatable = [];
    protected $table = 'consulting_room';

    protected $fillable = [ 'name'];

    public function getDisplayNameAttribute() {
        if( isInsideAdmin() || isRelationRequest() ) {
            return $this->name;
        }
        return $this;
    }
}