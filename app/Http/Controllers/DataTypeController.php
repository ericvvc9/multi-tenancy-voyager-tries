<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Routing\Controller as BaseController;
use TCG\Voyager\Http\Controllers\VoyagerBreadController;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Events\BreadDataAdded;
use TCG\Voyager\Events\BreadDataDeleted;
use TCG\Voyager\Events\BreadDataRestored;
use TCG\Voyager\Events\BreadDataUpdated;
use TCG\Voyager\Events\BreadImagesDeleted;
use TCG\Voyager\Facades\Voyager;
use Auth;
use Illuminate\Support\Str;
use TCG\Voyager\Http\Controllers\Controller;
use TCG\Voyager\Http\Controllers\Traits\BreadRelationshipParser;

class DataTypeController extends Controller
{
  public function index(Request $request) {
    //menu($menuName, $type = null, array $options = []);
    //dd(get_class_methods( Voyager::model('Menu')));
    //dd(get_class_methods(menu('client',_js)));
    //dd(get_class_methods(Voyager::model('DataType')::all()));
    //Voyager::model('DataType')::all()
    return Voyager::model('DataType')::all();

    //dd(menu('client')) ;
    return 1;
  }
  public function getFrom(Request $request) {
    
    //menu($menuName, $type = null, array $options = []);
    //dd(get_class_methods( Voyager::model('Menu')));
    //dd(get_class_methods(menu('client',_js)));
    //dd(get_class_methods());
    //Voyager::model('DataType')::all()
    $dataType= Voyager::model('DataType')::find($request->id);
    $x = $dataType->browseRows()->get();
    //dd(get_class_methods($x));
    //dd(get_class_methods($x));

    return $x;
    return $dataType;

    //dd(menu('client')) ;
    return 1;
  }
}