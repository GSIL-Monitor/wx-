<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\BaseController;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class OrderController extends BaseController
{
    //
    protected $model = Order::class;

    public function edit(Request $request, $id)
    {
       $res = $this->model::find($id)->update($request->all());
       return $this->returnMsg($res);
    }

    /**
     * 新增用户预约信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $filedValue =  $this->formVerif($request, [
            'company'=>'nullable',
            'phone'=>'required|numeric',
            'name'=>'required',
        ]);
        $filedValue['status'] = 0;
        $res = $this->model::create($filedValue);
        return $this->returnData($res->id+500);
    }

    public function getList(Request $request)
    {
        return $this->filter($this->model::orderBy('created_at','desc'), $request);
    }
}
