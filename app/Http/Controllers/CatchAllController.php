<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Hyn\Tenancy\Environment;

class CatchAllController extends Controller
{

    public function handle(){
        
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;

      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('home');
      }
    } 
    
}
