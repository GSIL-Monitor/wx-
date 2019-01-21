<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\BaseController;
use App\Models\FriendLink;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FriendLinkController extends BaseController
{
    /**
     * 设置表模型
     * @var string 
     */
    protected $model = FriendLink::class;

    /**
     * 添加友情链接
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request){
        $fileValue = $this->formVerif($request, [
            'name' => 'required',
            'url' => 'required',
        ]);
        $res = $this->model::create($fileValue);
        return $this->returnMsg($res);
    }

    /**
     * 修改友情链接信息
     *
     * @param \Illuminate\Http\Request $request
     * @param                          $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit(Request $request, $id){
        $fileValue = $this->formVerif($request, [
            'name' => 'required',
            'url' => 'required',
        ]);
        $res = $this->model::find($id)->update($fileValue);
        return $this->returnMsg($res);
    }
}
