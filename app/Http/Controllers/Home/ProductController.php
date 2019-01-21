<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends HomeBaseController
{
    /**
     * 产品功能
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $product = $this->getProduct()->toArray();
        $count = count($product);
        $result = [];
        for ($i=1;$i<=$count;$i++){
            if(($i % 4) == 2 || ($i % 4) == 3){
                $result[] = $i;
            }
        }
        return $this->returnView('product.product', ['product' => $product,'rule'=>$result]);
    }
}
