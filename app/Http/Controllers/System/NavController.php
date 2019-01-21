<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\BaseController;
use App\Models\Nav;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NavController extends BaseController
{
    protected $model = Nav::class;

    public function getList(Request $request)
    {
      return $this->returnData($this->model::with('seo')->get());
    }

    /**
     * 添加信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request) {
        $fileValue = $this->formVerif($request, [
            'name' => 'required',
            'link' => 'required',
            'seo_id' => 'nullable',
            'nav_banner' => 'nullable',
        ]);
        $res = $this->model::create($fileValue);
        return $this->returnMsg($res);
    }

    /**
     * 修改信息
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
            'link' => 'required',
            'seo_id' => 'nullable',
            'nav_banner' => 'nullable',
        ]);
        $res = $this->model::find($id)->update($fileValue);
        return $this->returnMsg($res);
    }
}
