<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\Source;
use App\Models\SourceUrl;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SourceController extends BaseController
{
    /*
     * 设置控制器模型
     */
    protected $model = Source::class;

    /**
     * 添加来源
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        //验证表单字段
        $source = $this->formVerif($request, [
            'name' => 'required', //来源名称
        ]);
        $res = Source::query()->create($source);
        return $this->returnMsg($res);
    }

    /**
     * 修改来源信息
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        //验证表单字段
        $source = $this->formVerif($request, [
            'name' => 'required', //来源名称
        ]);
        $res = Source::query()
            ->where('id', $id)
            ->update($source);
        return $this->returnMsg($res);
    }

    /**
     * 根据Id批量删除来源信息
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchIdDelete(Request $request){
        //验证表单字段
        $source = $this->formVerif($request, [
            'id' => 'required', //来源id
        ]);
        $res = Source::query()
            ->whereIn('id', $source['id'])
            ->delete();
        return $this->returnMsg($res);
    }

    /**
     * 返回指定Id商品的推广链接的列表
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function extensionURL(Request $request)
    {
        return $this->filter(SourceUrl::query()->where('goods_id', $request->get('goods_id')), $request);
    }
}
