<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\BaseController;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends BaseController
{
    protected $model = Product::class;

    /**
     * 添加分类
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse 返回响应消息
     *
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        //验证表单字段
        $filedValue = $this->formVerif($request, [
            'content' => 'required',
            'pid' =>'nullable',
            'lv' =>'nullable'
        ]);
        $filedValue['lv'] = $filedValue['lv']??0;
        $filedValue['lv'] = ++$filedValue['lv'];
        $res = $this->model::create($filedValue);
        return $this->returnData($res);
    }

    /**
     * 返回列表数据
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $data = $this->model::with('children.children')->where('pid', 0)->get();
        return $this->returnData($data);
    }

    /**
     * 删除分类前判断一下分类下是否还有文章
     *
     * @param \App\Http\Controllers\ID $id 分类id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $data = $this->model::with(['children'])->where('id', $id)->first()->toArray();

        $res = false;
        if (empty($data['children'])) {
            $res = $this->model::destroy($id);
            return $this->returnMsg($res);
        }
        return $this->returnMsg($res, '删除分类!');
    }

    /**
     * 修改分类名称,同时修改文章表的分类名称
     *
     * @param \Illuminate\Http\Request $request 请求体
     * @param integer                  $id      分类ID
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * 字段验证不通过抛出异常
     * @throws \App\Exceptions\FromVerif
     */
    public function edit(Request $request, $id)
    {
        //验证表单字段
        $filedValue = $this->formVerif($request, [
            'content' => 'required',
        ]);
        $result = $this->model::find($id)->update($filedValue);
        return $this->returnMsg($result);
    }
}
