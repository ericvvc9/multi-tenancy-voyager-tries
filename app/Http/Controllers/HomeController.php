<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCG\Voyager\Models\Page;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Hostname;
use TCG\Voyager\Facades\Voyager;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Events\BreadDataAdded;
use TCG\Voyager\Events\BreadDataDeleted;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
      $page = Page::whereSlug('homepage')->first();
      
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('home', compact('page'));
      }
    }
    
    public function index(Request $request) {
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('home');
      }
    }
    
    public function software(Request $request) {
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('software', compact('page'));
      }
    }
    
    public function pricing(Request $request) {
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('pricing', compact('page'));
      }
    }
    
    public function blog(Request $request) {
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('blog', compact('page'));
      }
    }
    
    public function contact(Request $request) {
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if (\App\Tenant::getRootFqdn() !== $fqdn) {
        return view('app');
      } else {
        return view('contact', compact('page'));
      }
    }
    
    public function slug(Request $request) {
      $page = Page::whereSlug($request->slug)->first();
      $env = app(Environment::class);
      $fqdn = optional($env->hostname())->fqdn;
      if($page) {
        return view('home', compact('page'));
      } else {
        abort(404);
      }
    }
}