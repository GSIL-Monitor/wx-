<?php

namespace App\Http\Controllers\System;

use App\Models\ConfigModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConfigController extends Controller
{

    /**
     * 响应关键字数据
     */
    public function index(Request $request)
    {
        $result = ConfigModel::with('hasFather')
            ->where('keyword',$request->keyword)
            ->first();
       if (empty($result)){
           return  ['status'=>false,'message'=>'没有基本信息'];
       }
        return  ['status'=>true,'message'=>'成功获得所有数据','data'=>$result->value];
    }

   /**
    * 插入新配置
    */
    public function store(Request $request)
    {
        
       ConfigModel::create([
           'pid'=>$request->input('pid',0),
           'type'=>$request->type,
           'keyword'=>$request->keyword,
           'value'=>$request->value,
           'desc'=>$request->input('desc','没有描述')
       ]);
       return ['status'=>true,'message'=>'新增成功'];
    }

    /**
     * 修改配置项
     * @param Request $request
     * @param $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        $m = ConfigModel::where('keyword',$request->keyword)->first();
        $m->pid=$request->input('pid',0);
        $m->type = $request->type;
        $m->keyword = $request->keyword;
        $m->value = $request->value;
        $m->desc = $request->input('desc','没有描述');
        $m->save();
        return ['status'=>true,'message'=>'数据已修改'];
    }

}
