export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        path: '/login',
        name: '登录',
        component: './Login',
      },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
    ],
  },
  { name: '用户列表', icon: 'user', path: '/user-list', component: './UserList' },
  { name: '社团组织列表', icon: 'home', path: '/org-list', component: './OrgList' },
  { name: '社团类型列表', icon: 'bars', path: '/org-type-list', component: './OrgTypeList' },
  { name: '社团举报', icon: 'warning', path: '/org-report-list', component: './OrgReportList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
