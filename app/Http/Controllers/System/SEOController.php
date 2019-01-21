<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\BaseController;
use App\Models\SEO;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SEOController extends BaseController
{
    protected $model = SEO::class;

    /**
     * 添加信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request){
        $fileValue = $this->formVerif($request, [
            'name' => 'required',
            'desc' => 'nullable',
            'keywords' => 'nullable',
            'title' => 'nullable',
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
            'desc' => 'nullable',
            'keywords' => 'nullable',
            'title' => 'nullable',
        ]);
        $res = $this->model::find($id)->update($fileValue);
        return $this->returnMsg($res);
    }
}
