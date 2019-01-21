<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactController extends HomeBaseController
{
    /**
     * 公司详情展示页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $contact = $this->getConfig('sitebase', 'sitebase')
            ->toArray()[0]['value'] ;
        return $this->returnView('contact.contact', ['contact' => $contact]);
    }
}
