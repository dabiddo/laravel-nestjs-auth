<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password'=>'required|same:password'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;

        return response($success, 201);
    }

    public function login(Request $request)
    {
        $login = $request->all();

        Auth::attempt($login);

        $user = User::where('email',$request->email)->first();
        $token = $user->createToken('MyApp')->accessToken;
        //$token  = $user->createToken('MyApp')->plainTextToken;

        return response(['token'=>$token],200);
    }
}
