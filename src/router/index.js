import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login';
import findPass from '@/pages/findPass';

import Register from '@/pages/Register'
import Download from '@/pages/Download';

import Personal from '@/pages/Personal'
import MessPerson from '@/components/personalCompents/MessPerson'
import HeadAndPass from '@/components/personalCompents/HeadAndPass';
import Varification from '@/components/personalCompents/Varification'
import Account from '@/components/personalCompents/Account';
import Recharge from '@/components/personalCompents/Recharge';
import withDraw from '@/components/personalCompents/WithDraw';
import Pandect from '@/components/personalCompents/Pandect';
import SpreadInvest from '@/components/personalCompents/SpreadInvest';
import Borrowin from '@/components/personalCompents/Borrowin';
import Quota from '@/components/personalCompents/Quota';
import RedPackage from '@/components/personalCompents/RedPackage';

import InvestRecords from '@/pages/InvestRecords';
import InvestDetail from '@/pages/InvestDetail';
import Agreement from '@/pages/Agreement';

import Calculator from '@/pages/Calculator';
import Investment from '@/components/calcutorComponents/Investment';
import Borrow from '@/components/calcutorComponents/Borrow';
import BorrowApply from '@/components/borrowCompents/Apply';

import Guide from '@/pages/Guide';
import iBorrow from '@/pages/Borrow';

import About from '@/pages/About'
import AboutPlatform from '@/components/aboutCompents/Platform'
import AboutRecruit from '@/components/aboutCompents/Recruit'
import AboutNotice from '@/components/aboutCompents/Notice'
import AboutNews from '@/components/aboutCompents/News'
import AboutQuestion from '@/components/aboutCompents/Question'
import AboutLaw from '@/components/aboutCompents/Law'
import AboutContact from '@/components/aboutCompents/Contact'
import AboutSecurity from '@/components/aboutCompents/Security'
import AboutDetail from '@/components/aboutCompents/Detail'

Vue.use(Router);
import { MessageBox } from 'element-ui'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/findpass',
            name: 'findPass',
            component: findPass
        },
        {
            path: '/reg',
            name: 'Register',
            component: Register
        },
        {
            path: '/download',
            name: 'Download',
            component: Download
        },
        {
            path: '/personal',
            name: 'Personal',
            component: Personal,
            beforeEnter: requireAuth,
            children: [
                {
                    path: '/',
                    redirect: 'person'
                },
                {
                    path: 'person',
                    name: 'person',
                    component: MessPerson,
                    beforeEnter: requireCheck
                },
                {
                    path: 'setpass',
                    name: 'HeadAndPass',
                    component: HeadAndPass
                },
                {
                    path: 'varification',
                    name: 'Varification',
                    component: Varification
                },
                {  //银行账户
                    path: 'account',
                    name: 'Account',
                    component: Account
                },
                {  // 我要充值
                    path: 'recharge',
                    name: 'Recharge',
                    component: Recharge,
                    beforeEnter: requireCheck
                },
                {  //我要提现
                    path: 'withdraw',
                    name: 'withDraw',
                    component: withDraw,
                    beforeEnter: requireCheck
                },
                {  //我要提现
                    path: 'redpackage',
                    name: 'RedPackage',
                    component: RedPackage
                },
                {
                    path: 'pandect',
                    name: 'Pandect',
                    component: Pandect
                },
                {
                    path: 'spread',
                    name: 'SpreadInvest',
                    component: SpreadInvest
                },
                {
                    path: 'borrowin',
                    name: 'Borrowin',
                    component: Borrowin
                },
                {
                    path: 'quota',
                    name: 'Quota',
                    component: Quota
                }
            ]
        },
        {
            path: '/calculator',
            name: 'Calculator',
            component: Calculator,
            children: [
                {
                    path: '/',
                    redirect: 'investment'
                },
                {
                    path: 'investment',
                    name: 'Investment',
                    component: Investment
                },
                {
                    path: 'borrow',
                    name: 'Borrow',
                    component: Borrow
                }
            ]
        },
        {
            path: '/invest',
            name: 'InvestRecords',
            component: InvestRecords
        },
        {
            path: '/invest/detail',
            name: 'InvestDetail',
            component: InvestDetail,
            beforeEnter: requireCheck
        },
        {
            path: '/invest/agreement',
            name: 'Agreement',
            component: Agreement
        },
        {
            path: '/iborrow',
            name: 'iBorrow',
            component: iBorrow,
        },
        {
            path: '/iborrow/apply',
            name: 'BorrowApply',
            component: BorrowApply
        },
        {
            path: '/guide',
            name: 'Guide',
            component: Guide
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            children: [
                {
                    path: '/',
                    redirect: 'platform'
                },
                {
                    path: 'platform',
                    name: 'Platform',
                    component: AboutPlatform
                },
                {
                    path: 'recruit',
                    name: 'Recruit',
                    component: AboutRecruit
                },
                {
                    path: 'notice',
                    name: 'Notice',
                    component: AboutNotice
                },
                {
                    path: 'news',
                    name: 'News',
                    component: AboutNews
                },
                {
                    path: 'question',
                    name: 'Question',
                    component: AboutQuestion
                },
                {
                    path: 'law',
                    name: 'Law',
                    component: AboutLaw
                },
                {
                    path: 'contact',
                    name: 'Contact',
                    component: AboutContact
                },
                {
                    path: 'security',
                    name: 'Security',
                    component: AboutSecurity
                },
                {
                    path: 'detail',
                    name: 'Detail',
                    component: AboutDetail
                }
            ]
        }
    ]
})

function requireAuth(to, from, next) {
    let authUser = sessionStorage.getItem('authUser');
    if (authUser) {
        return next();
    } else {
        return next('/login');
    }
}

function requireCheck(to, from, next) {
    let authUser = sessionStorage.getItem('authUser');
    if (authUser) {
        let authUser = JSON.parse(Base64.decode(sessionStorage.getItem('authUser')));

        if(authUser.v_mobile != 1){
            MessageBox.alert('请先完成手机号认证', '提示信息', {
                confirmButtonText: '确定', type: 'error', callback: action => {
                    return next('/personal/varification');
                }
            });
        }

        if(authUser.v_identity != 1){
            MessageBox.alert('请先完成身份证实名认证', '提示信息', {
                confirmButtonText: '确定', type: 'error', callback: action => {
                    return next('/personal/varification');
                }
            });
        }

        return next();
    }else{
        return next();
    }
}