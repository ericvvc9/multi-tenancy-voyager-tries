<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/login', 'ApiController@login');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        $user=$request->user();
        $user->role->permissions;
        return $user;
    });
    Route::get('logout', 'ApiController@logout');


    
    try {
        foreach (Voyager::model('DataType')::all() as $dataType) {
            $breadController = $dataType->controller
                             ? Str::start($dataType->controller, '\\')
                             : 'BreadController';

            Route::get($dataType->slug.'/order', $breadController.'@order')->name($dataType->slug.'.order');
            Route::post($dataType->slug.'/action', $breadController.'@action')->name($dataType->slug.'.action');
            Route::post($dataType->slug.'/order', $breadController.'@update_order')->name($dataType->slug.'.order');
            Route::get($dataType->slug.'/{id}/restore', $breadController.'@restore')->name($dataType->slug.'.restore');
            Route::get($dataType->slug.'/relation', $breadController.'@relation')->name($dataType->slug.'.relation');
            Route::resource($dataType->slug, $breadController);
        }
    } catch (\InvalidArgumentException $e) {
        throw new \InvalidArgumentException("Custom routes hasn't been configured because: ".$e->getMessage(), 1);
    } catch (\Exception $e) {
        // do nothing, might just be because table not yet migrated.
    }

    Route::get('menu','MenuController@index');
    Route::get('/alldatatypes','DataTypeController@index');
    Route::get('/alldatatypesfrom','DataTypeController@getFrom');
    
});