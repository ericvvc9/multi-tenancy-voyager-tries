<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'HomeController@index');
Route::get('/software', 'HomeController@software');
Route::get('/pricing', 'HomeController@pricing');
Route::get('/blog', 'HomeController@blog');
Route::get('/contact', 'HomeController@contact');
Route::get('/oauth', 'HomeController@oauth');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('{catchall?}', 'CatchAllController@handle')->where('catchall', '^(?!(api|static|storage)).*$');

Route::get('/storage/{path}', '\App\Http\Controllers\HynOverrideMediaController')
    ->where('path', '.+')
    ->name('tenant.media');
