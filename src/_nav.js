import { CNavGroup, CNavItem } from '@coreui/react'
import React from 'react'
const _nav = [
  {
    component: CNavGroup,
    name: '회원관리',
    to: '/user',
    items: [
      {
        component: CNavItem,
        name: '사용자 조회',
        to: '/user/search',
      },
      {
        component: CNavItem,
        name: '고객 현황',
        to: '/user/stat',
      },
      {
        component: CNavItem,
        name: '탈퇴 회원',
        to: '/user/withdraw',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '아티스트',
    to: '/artist',
    items: [
      {
        component: CNavItem,
        name: '아티스트 관리',
        to: '/artist/manage',
      },
      {
        component: CNavItem,
        name: '아티스트 댓글',
        to: '/artist/comment',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '팬픽랭킹',
    to: '/ranking',
    items: [
      {
        component: CNavItem,
        name: '투표 관리자',
        to: '/vote/manager',
      },
      {
        component: CNavItem,
        name: '이벤트 투표',
        to: '/event/vote',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '팬심 서포트',
    to: '/support',
    items: [
      {
        component: CNavItem,
        name: '팬심 서포트 관리',
        to: '/support/manager',
      },
      {
        component: CNavItem,
        name: '상품 관리',
        to: '/support/product',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '팬플레이',
    to: '/fan',
    items: [
      {
        component: CNavItem,
        name: '팬피드',
        to: '/fan/feed/manager',
      },
      {
        component: CNavItem,
        name: '팬DIY',
        to: '/fan/diy/manager',
      },
      {
        component: CNavItem,
        name: '팬톡',
        to: '/fan/talk/manager',
      },
      {
        component: CNavItem,
        name: '게시물 신고',
        to: '/fan/report/feed',
      },
      {
        component: CNavItem,
        name: '댓글관리',
        to: '/fan/reply/manager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '기능서비스',
    to: '/service',
    items: [
      {
        component: CNavItem,
        name: '출석 퀘스트',
        to: '/attendance',
      },
      {
        component: CNavItem,
        name: '미션 퀘스트',
        to: '/mission',
      },
      {
        component: CNavItem,
        name: '랜덤박스',
        to: '/box/free',
      },
      {
        component: CNavItem,
        name: '전광판',
        to: '/sign/manager',
      },
      {
        component: CNavItem,
        name: '광고중(홈화면)',
        to: '/reward/ad',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '광고',
    to: '/admanager',
    items: [
      {
        component: CNavItem,
        name: '탭조이 광고 로그',
        to: '/admanager/tapjoy/ad',
      },
      {
        component: CNavItem,
        name: 'TNK 광고 로그',
        to: '/admanager/tnk/ad',
      },
      {
        component: CNavItem,
        name: '버즈빌 광고 로그',
        to: '/admanager/etc/ad',
      },
      {
        component: CNavItem,
        name: '애드몹 광고 로그',
        to: '/admanager/admob/ad/log',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '인앱결제',
    to: '/purchase',
    items: [
      {
        component: CNavItem,
        name: '캐시포인트 관리',
        to: '/cash/point/manager',
      },
      {
        component: CNavItem,
        name: '인앱 결제',
        to: '/in/app/manager',
      },
      {
        component: CNavItem,
        name: '기타 결제',
        to: '/etc/app/manager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '포인트관리',
    to: '/present',
    items: [
      {
        component: CNavItem,
        name: '종합 포인트 지급 관리',
        to: '/point/log',
      },
      {
        component: CNavItem,
        name: '포인트 정책',
        to: '/point/policy',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '서비스(알림)',
    to: '/notice',
    items: [
      {
        component: CNavItem,
        name: '메인 배너',
        to: '/banner/manager',
      },
      {
        component: CNavItem,
        name: '팝업 공지',
        to: '/pop/up/manager',
      },
      {
        component: CNavItem,
        name: '공지사항 관리',
        to: '/notice/manager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '정책설정',
    to: '/policy',
    items: [
      {
        component: CNavItem,
        name: '기본 정책',
        to: '/policy/basic',
      },
      {
        component: CNavItem,
        name: '레벨 정책',
        to: '/policy/level',
      },
      {
        component: CNavItem,
        name: '자주묻는 질문',
        to: '/policy/faq',
      },
      {
        component: CNavItem,
        name: '앱 버전 관리',
        to: '/policy/app',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '어드민관리',
    to: '/manager',
    items: [
      {
        component: CNavItem,
        name: '관리자',
        to: '/manager/log',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
]

export default _nav
