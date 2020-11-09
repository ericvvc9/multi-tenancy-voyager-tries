<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function login(Request $request)
    {
      $request->validate([
        'email' => 'required',
        'password' => 'required'
      ]);
      $userdata = array(
        'email' => $request->email,
        'password' => $request->password
      );
      $login_type = filter_var($request->email, FILTER_VALIDATE_EMAIL ) 
          ? 'email' 
          : 'username';
      $request->merge([
          $login_type => $request->email
      ]);
      
      $authAttempt = Auth::attempt($request->only($login_type, 'password'));
      if ($authAttempt) {
        $token = Str::random(60);
        $user = Auth::user();
        $token = $user->createToken('kiru-spa');

        return $token->plainTextToken;
      } else {
        return response()->json([
          "message" => "Datos Incorrectos",
          "success" => false
        ],401);
      }
    }
    public function register(Request $request)
    {
      return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
      ]);
    }
    public function logout(Request $request)
    {
      $user = Auth::user();
      $user->currentAccessToken()->delete();
      return ["success" => true];
    }
    
}