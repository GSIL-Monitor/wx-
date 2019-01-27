<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\BaseController;
use App\Models\ArticleTemplate;
use App\Models\Goods;
use App\Models\GoodsOrder;
use App\Models\Meals;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GoodsController extends BaseController
{
    /**
     * 展示商品详情
     *
     * @param $code
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show($code)
    {
        //解码得到商品Id和来源
        $idAndSource = $this->deCode($code);
        $goods = Goods::query()
            ->with(['meals', 'size'])
            ->where('id', $idAndSource[0])
            ->first()
            ->toArray();
        return view($this->getTemplate($goods['template']), [
            'goods' => $goods,
            'source' => $idAndSource[1], //如果用户下单需知道是哪个来源下单的
            'falseName' => $this->falseName(), //假购买用户
            'province' => $this->province(), //假购买用户省区
            'falsePhone' => $this->falsePhone(), //假手机号码
            'falseTime' => $this->falseTime(), //假购买时间
        ]);
    }

    /**
     * 得到商品模板展示路径
     *
     * @param $name
     *
     * @return mixed
     */
    public function getTemplate($name)
    {
        return ArticleTemplate::query()
            ->where('name', $name)
            ->first()
            ->path;
    }

    /**
     * 密文解密
     *
     * @param $code
     *
     * @return array
     */
    public function deCode($code)
    {
        $code = cmf_url_decrypt($code);
        return explode('-', $code);
    }

    /**
     * 假购买用户
     *
     * @return array
     */
    public function falseName()
    {
        return [
            '赵', '张', '刘', '李', '王', '欧阳', '许', '朱', '秦', '尤', '何', '吕', '施',
            '孔', '曹', ' 严', '华', '金', '魏', '陶', '姜', '贲', '邓', '郁', '单', '杭', '洪', '包',
            '诸', '左', '石', '崔', '吉'
        ];
    }

    /**
     * 假购买用户省区
     *
     * @return array
     */
    public function province()
    {
        return [
            '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江省', '安徽', '福建',
            '江西', '山东' . '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西',
            '甘肃省', '青海', '宁夏', '新疆'
        ];
    }

    /**
     * 假手机号码
     *
     * @return array
     */
    public function falsePhone()
    {
        return [
            '136****0083',
            '135****7729',
            '177****0612',
            '187****0716',
            '199****0631',
            '186****0631',
            '183****6511',
            '182****6807',
            '188****3288',
            '156****9000',
            '156****5000',
            '155****7081',
            '138****7613',
            '139****2214',
            '132****1781',
            '131****1758',
            '135****2643',
            '139****6531',
            '152****8817',
            '157****9569',
        ];
    }

    /**
     * 假购买时间
     *
     * @return array
     */
    public function falseTime()
    {
        return [
            '10分钟',
            '30分钟',
            '45分钟',
            '1小时',
            '2小时',
            '4小时',
            '5分钟',
            '1分钟',
            '8分钟',
            '25分钟',
            '3小时',
            '7小时',
            '10分钟',
            '30秒',
        ];
    }

    /**
     * 添加订单
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function orderAdd(Request $request)
    {
        $field = $this->formVerif($request, [
            'meal_name' => 'required',
            'num' => 'required',
            'phone' => 'required',
            'name' => 'required',
            'paytype' => 'required',
            'message' => 'nullable',
            'size_name' => 'required',
            'source' => 'required',
        ]);
        $field['order_num'] = $this->makeOrderNum($field['phone']);
        $field['paytype'] = $this->payType($field['paytype']);
        $field['order_total_price'] = $this->makeTotalPrice($field['meal_name'], $field['num']);//todo 算出总价
        $field['ip'] = $request->getClientIp();
        $field['goods_name'] = $this->makeGoodsName(request()->get('goods_id'));
        $field['status'] = 0;
        $field['address'] = $this->makeAddress();
        GoodsOrder::query()->create($field);
        return response()->json([
            'code' => '0',
            'url' => 'http://www.baidu.com'
        ]);
    }

    /**
     * 生成订单号
     *
     * @param $phone
     *
     * @return string
     */
    public function makeOrderNum($phone)
    {
        $time = date('YmdHis', time());
        $randNum = rand(10000, 99999);
        return $phone . $time . $randNum;
    }

    /**
     * 付款方法
     *
     * @param $type
     *
     * @return mixed
     */
    public function payType($type)
    {
        $arr = [
            'huodao' => '货到付款',
            'wxOnline' => '微信在线付款',
        ];
        return $arr[$type];
    }

    /**
     * 算出购买套餐的总价
     *
     * @param $meal
     * @param $num
     *
     * @return float|int
     */
    public function makeTotalPrice($meal, $num)
    {
        $mealPrice = Meals::query()
            ->where('meal_name', $meal)
            ->first()
            ->meal_price;
        return $mealPrice * $num;
    }

    /**
     * 返回品名
     *
     * @param $goodsId
     *
     * @return mixed
     */
    public function makeGoodsName($goodsId)
    {
        return Goods::query()
            ->where('id', $goodsId)
            ->first()
            ->goods_title;
    }

    /**
     * 地址拼凑
     *
     * @return string
     */
    public function makeAddress()
    {
        $address = request()->get('address');
        $province = request()->get('province');
        $city = request()->get('city');
        $area = request()->get('area');
        return $province . '-' . $city . '-' . $area . '-' . $address;
    }
}
