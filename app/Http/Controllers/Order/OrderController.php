<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\GoodsOrder;
use App\Models\Source;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use QL\QueryList;

class OrderController extends BaseController
{
    //设置模型
    protected $model = GoodsOrder::class;

    /**
     * 手机号码和Ip定位
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ipAndPhoneRource($id)
    {
        $order = GoodsOrder::query()
            ->where('id', $id)
            ->first();
        $ql = QueryList::getInstance();
        $html = $ql->get('http://mobsec-dianhua.baidu.com/dianhua_api/open/location?tel=' . $order->phone)
            ->getHtml();
        $phoneLocation = json_decode($html, true)['response'][$order->phone]['location'];

        $ip_html = $ql->get('http://freeapi.ipip.net/' . $order->ip)
            ->getHtml();
        $ipLocation = json_decode($ip_html, true);
        $ipResult = $ipLocation[0] . $ipLocation[1] . $ipLocation[2] . $ipLocation[3];

        $data = [
            'ip' => $ipResult,
            'phone' => $phoneLocation,
        ];
        return $this->returnData($data);
    }

    /**
     * 批量删除
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function batchDelete(Request $request)
    {
        $ids = $this->formVerif($request, [
            'id' => 'required'
        ])['id'];

        $res = GoodsOrder::query()
            ->whereIn('id', $ids)
            ->delete();
        return $this->returnMsg($res);
    }

    /**
     * 返回指定Id订单信息
     *
     * @param integer $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        $goods = GoodsOrder::query()
            ->where('id', $id)
            ->first()
            ->toArray();
        $goods['source_url'] = url('') . '/' . cmf_url_encrypt($id . '-' . $goods['source']);
        return $this->returnData($goods);
    }

    /**
     * 修改订单
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);
        $res = GoodsOrder::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改订单状态
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function editStatus($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'status'=>'required'
        ]);
        $res = GoodsOrder::query()
            ->where('id', $id)
            ->update($field);
        return $this->returnMsg($res);
    }

    public function getList(Request $request)
    {
        $query = $this->model::orderBy('created_at', 'desc');
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        return $this->filter($query, $request);
    }
}
