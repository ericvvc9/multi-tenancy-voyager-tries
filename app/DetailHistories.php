<?php

namespace TCG\Voyager\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Traits\Translatable;

class DetailHistories extends Model
{
    use Translatable;

    protected $translatable = ['slug', 'name'];

    protected $table = 'detail_histories';

    protected $fillable = ['slug', 'name'];

}
