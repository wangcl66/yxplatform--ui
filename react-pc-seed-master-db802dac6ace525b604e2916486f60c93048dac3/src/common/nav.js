import Home from '../views/test/Home';


const data = [{
  component: Home,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: [{
    name: 'Dashboard',
    icon: 'laptop',
    path: 'dashboard',
    children: [{
      name: '分析页',
      path: 'analysis',
      // component: Home,
    }],
  }, {
    name: '表单页',
    path: 'form',
    icon: 'database',
    children: [{
      name: '基础表单',
      path: 'work',
      // component: Home,
    }],
    }],
}];

export function getNavData() {
  return data;
}

export default data;
