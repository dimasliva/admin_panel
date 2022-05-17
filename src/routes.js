import React from 'react'
import UserStat from './views/member/UserStat'
import SupportManager from './views/support/SupportManager'
import SupportProduct from './views/support/SupportProduct'
import SupportProductGroup from './views/support/SupportProductGroup'
import SupportProductAd from './views/support/SupportProductAd'
import SupportProductDo from './views/support/SupportProductDo'
import ArtistCommentReport from './views/artist/ArtistCommentReport'
import ServiceAttendance from './views/service/service/attendance/ServiceAttendance'
import ServiceMission from './views/service/service/mission/ServiceMission'
import ServiceBoxFree from './views/service/service/box/ServiceBoxFree'
import ServiceRewardAd from './views/service/service/reward/ServiceRewardAd'
import ServiceTapjoyAd from './views/service/admanager/tapjoyad/ServiceTapjoyAd'
import ServiceTnkAd from './views/service/admanager/tnkad/ServiceTnkAd'
import ServiceEtcAd from './views/service/admanager/etcad/ServiceEtcAd'
import ServiceAdmobAdLog from './views/service/admanager/admobad/ServiceAdmobAdLog'
import CashPointManager from './views/service/purchase/cashpoint/CashPointManager'
import InAppManager from './views/service/purchase/inapp/InAppManager'
import SignManager from './views/service/service/sign/SignManager'
import VoteManager from './views/ranking/manager/VoteManager'
import EventVote from './views/ranking/event/EventVote'
import EtcPayManager from './views/service/purchase/etcpay/EtcPayManager'
import PresentPointLog from './views/service/pointmanager/log/PresentPointLog'
import PointPolicy from './views/service/pointmanager/policy/PointPolicy'
import BannerManager from './views/service/noticeservice/banner/BannerManager'
import PolicyBasic from './views/service/policymanager/basic/BasicPolicyRule'
import PolicyApp from './views/service/policymanager/app/AppVersion'
import PopUpManager from './views/service/noticeservice/popup/PopUpManager'
import NoticeManager from './views/service/noticeservice/notice/NoticeManager'
import UserSearch from './views/member/UserSearch'
import UserWithdraw from './views/member/UserWithdraw'
import ArtistManage from './views/artist/ArtistManage'
import ArtistComment from './views/artist/ArtistComment'
import FanReplyManager from './views/fanplay/replymanager/FanReplyManager'
import FanTalkManager from './views/fanplay/talkmanager/FanTalkManager'
import PostReportFeed from './views/fanplay/reportfeed/PostReportFeed'
import FanDiyManager from './views/fanplay/diymanager/FanDiyManager'
import FanFeedManager from './views/fanplay/feedmanager/FanFeedManager'
import ManagerLog from './views/service/adminmanager/log/ManagerLog'
import PolicyExp from './views/service/policymanager/level/PolicyExp'
import FaqPolicy from './views/service/policymanager/faq/FaqPolicy'
// ex
const MemberList = React.lazy(() => import('./views/member/MemberList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/memberList', name: 'MemberList', component: MemberList },

  // user
  { path: '/user', exact: true },
  { path: '/user/search', name: 'UserSearch', component: UserSearch },
  { path: '/user/stat', name: 'UserStat', component: UserStat },
  { path: '/user/withdraw', name: 'UserWithdraw', component: UserWithdraw },
  // artist
  { path: '/artist', exact: true },
  { path: '/artist/manage', name: 'ArtistManage', component: ArtistManage },
  { path: '/artist/comment', exact: true, name: 'ArtistComment', component: ArtistComment },
  { path: '/artist/comment/report', name: 'ArtistCommentReport', component: ArtistCommentReport },
  // ranking
  { path: '/ranking', exact: true },
  { path: '/vote/manager', name: 'VoteManager', component: VoteManager },
  { path: '/event/vote', name: 'EventVoteManager', component: EventVote },
  // Fan support
  { path: '/support', exact: true },
  { path: '/support/manager', name: 'SupportManager', component: SupportManager },
  {
    path: '/support/product',
    exact: true,
    name: 'SupportProduct',
    component: SupportProduct,
  },
  {
    path: '/support/product/group',
    name: 'SupportProductGroup',
    component: SupportProductGroup,
  },
  {
    path: '/support/product/ad',
    name: 'SupportProductAd',
    component: SupportProductAd,
  },
  {
    path: '/support/product/donation',
    name: 'SupportProductDo',
    component: SupportProductDo,
  },
  // FanPlay
  { path: '/fan', exact: true },
  { path: '/fan/feed/manager', name: 'FanplayManager Page', component: FanFeedManager },
  { path: '/fan/diy/manager', name: 'FanDiyManager Page', component: FanDiyManager },
  { path: '/fan/talk/manager', name: 'FanTalkManager Page', component: FanTalkManager },
  { path: '/fan/report/feed', name: 'PostReportFeed Page', component: PostReportFeed },
  { path: '/fan/reply/manager', name: 'FanReplyManager Page', component: FanReplyManager },
  // Service
  { path: '/service', exact: true },
  { path: '/attendance', name: 'Attendance Page', component: ServiceAttendance },
  { path: '/mission', name: 'Mission Page', component: ServiceMission },
  { path: '/box/free', name: 'BoxFree Page', component: ServiceBoxFree },
  { path: '/sign/manager', name: 'SignManager Page', component: SignManager },
  { path: '/reward/ad', name: 'RewardAd Page', component: ServiceRewardAd },
  // AdManager
  { path: '/admanager', exact: true },
  { path: '/admanager/tapjoy/ad', name: 'TapjoyAd Page', component: ServiceTapjoyAd },
  { path: '/admanager/tnk/ad', name: 'TnkAd Page', component: ServiceTnkAd },
  { path: '/admanager/etc/ad', name: 'EtcAd Page', component: ServiceEtcAd },
  { path: '/admanager/admob/ad/log', name: 'AdmobAdLog Page', component: ServiceAdmobAdLog },
  // In app purchase
  { path: '/purchase', exact: true },
  { path: '/cash/point/manager', name: 'ServiceAdmobAdLog Page', component: CashPointManager },
  { path: '/in/app/manager', name: 'InAppManager Page', component: InAppManager },
  { path: '/etc/app/manager', name: 'EtcAppManager Page', component: EtcPayManager },
  // Point manager
  { path: '/present', exact: true },
  { path: '/point/log', name: 'PointLog Page', component: PresentPointLog },
  { path: '/point/policy', name: 'PointLog Page', component: PointPolicy },
  // Notice Service
  { path: '/notice', exact: true },
  { path: '/banner/manager', name: 'BannerManager Page', component: BannerManager },
  { path: '/pop/up/manager', name: 'Popup Manager Page', component: PopUpManager },
  { path: '/notice/manager', name: 'NoticeManager Page', component: NoticeManager },
  // Policy
  { path: '/policy', exact: true },
  { path: '/policy/basic', name: 'PolicyBasic Page ', component: PolicyBasic },
  { path: '/policy/level', name: 'LevelPolicyExp Page ', component: PolicyExp },
  { path: '/policy/faq', name: 'Faq policy Page ', component: FaqPolicy },
  { path: '/policy/app', name: 'PolicyAppVersion Page ', component: PolicyApp },
  // Admin Manager
  { path: '/manager', exact: true },
  { path: '/manager/log', exact: true, name: 'ManagerLog Page ', component: ManagerLog },
]

export default routes
