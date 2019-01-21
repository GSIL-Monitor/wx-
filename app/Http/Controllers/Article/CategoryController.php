<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\BaseController;
use App\Models\Article;
use App\Models\Categroy;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends BaseController
{
    protected $model = Categroy::class;

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
            'name' => 'required',
            'pid' =>'nullable'
        ]);
        $res = Categroy::create($filedValue);
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
        $data = $this->model::with('children')->where('pid', 0)->get();
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
        $data = $this->model::with(['hasArticle', 'children'])->where('id', $id)->first()->toArray();

        $res = false;
        if (empty($data['has_article']) && empty($data['children'])) {
            $res = $this->model::destroy($id);
            return $this->returnMsg($res);
        }
        return $this->returnMsg($res, '当前分类下还有分类数据或者文章数据,删除分类!');
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
            'name' => 'required',
        ]);
        $result = Categroy::find($id);
        $name = $result->name;
        $result->update($filedValue);
        //同时修改文章表的分类名称
        $res = Article::where('category', $name)->update(['category' => request('name')]);
        return $this->returnMsg($res);
    }
}
