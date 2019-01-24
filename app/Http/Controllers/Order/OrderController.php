<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\BaseController;
use App\Models\GoodsOrder;
use App\Models\Source;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends BaseController
{
    //设置模型
    protected $model = GoodsOrder::class;
}
