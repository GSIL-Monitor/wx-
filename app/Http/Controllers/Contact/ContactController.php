<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\BaseController;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class ContactController extends BaseController
{
    //
    protected $model = Contact::class;

    public function edit(Request $request, $id)
    {
        $res = $this->model::find($id)->update($request->all());
        return $this->returnMsg($res);
    }

    public function add(Request $request)
    {
        $filedValue =  $this->formVerif($request, [
            'company'=>'nullable',
            'content'=>'required',
            'phone'=>'required',
            'name'=>'required',
            'qq'=>'nullable',
        ]);
        $filedValue['status'] = 0;
        $res = $this->model::create($filedValue);
        return $this->returnMsg($res);
    }

    public function getList(Request $request)
    {
        return $this->filter($this->model::orderBy('created_at','desc'), $request);
    }
}
