/**
 * link 没有自菜单， 直接跳转
 * readFile： 需要通过读取文件列表获取菜单
 */

import { environment } from '@env/environment';

const {  baseUrl } = environment;

const baseImgUrl = `${baseUrl}/assets/img`;


export const viewList = [
  {
    title: '3D机房',
    icon: `${baseImgUrl}/idc/portal/3d.png`,
    bg: `${baseImgUrl}/idc/portal/3d-bg.png`,
    path: 'default/visualization/3D',
    menu: 'menu.visualization',
    moduleName: 'menu.visualization.3D',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-3D.png`,
  },
  {
    title: '组态监控',
    icon: `${baseImgUrl}/idc/portal/configuration.png`,
    path: 'default/visualization/configuration',
    menu: 'menu.visualization',
    moduleName: 'menu.visualization.configuration',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-config.png`,
  },
  {
    title: '智慧展示',
    icon: `${baseImgUrl}/idc/portal/wisdom.png`,
    path: 'default/visualization/wisdom',
    menu: 'menu.visualization',
    moduleName: 'menu.visualization.wisdom',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-show.png`,
  },
  {
    title: '无人机巡检',
    icon: `${baseImgUrl}/idc/portal/uav.png`,
    path: 'default/visualization/uav',
    menu: 'menu.visualization',
    moduleName: 'menu.visualization.uav',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-UAV.png`,
  },
  {
    title: '机器人巡检',
    icon: `${baseImgUrl}/idc/portal/robot.png`,
    path: 'default/visualization/robot',
    menu: 'menu.visualization',
    moduleName: 'menu.visualization.robot',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-robot.png`,
  },
];
// 运营中心
export const operationList = [
  {
    title: '参数查询',
    icon: `${baseImgUrl}/idc/portal/device.png`,
    path: 'default/operation/equipment',
    menu: 'menu.operation',
    moduleName: 'menu.operation.equipment',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-devOps.png`,
  },
  {
    title: '智慧分析',
    icon: `${baseImgUrl}/idc/portal/analyze.png`,
    path: 'default/operation/analysis',
    menu: 'menu.operation',
    moduleName: 'menu.operation.analysis',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-dispatch.png`,
  },
  {
    title: '能耗管理',
    icon: `${baseImgUrl}/idc/portal/energy.png`,
    path: 'default/operation/energy',
    menu: 'menu.operation',
    moduleName: 'menu.operation.energy',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-show.png`,
  },
  {
    title: '告警管理',
    icon: `${baseImgUrl}/idc/portal/alart.png`,
    path: 'default/operation/warning/classification',
    menu: 'menu.operation',
    moduleName: 'menu.operation.warning',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-analysis.png`,
  },
  {
    title: '报表工具',
    icon: `${baseImgUrl}/idc/portal/chart.png`,
    navImg: `${baseImgUrl}/idc/nav-bar/nav-UAV.png`,
    path: 'default/operation/report',
    auth: 'haveAuth',
    menu: 'menu.operation',
    moduleName: 'menu.operation.report',
  },
];
// 调度中心
export const applicationList = [
  {
    title: '智慧巡检',
    icon: `${baseImgUrl}/idc/portal/examine.png`,
    menu: 'menu.application',
    path: 'default/application/polling',
    moduleName: 'menu.application.polling',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/nav-energy.png`,
  },
  {
    title: '机器人随工',
    icon: `${baseImgUrl}/idc/portal/work.png`,
    menu: 'menu.application',
    path: 'default/application/withjob',
    moduleName: 'menu.application.withjob',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/idc/nav-bar/withjob.png`,
  },
];
// 成果展示
export const achievementList = [
  {
    name:"图建成果",
    list:[{
      title: '地震构造图',
      icon: `${baseImgUrl}/idc/portal/user.png`,
      menu: 'menu.manage',
      moduleName: 'menu.manage.account',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-user.png`,
      "children": [{
        "text": "地震构造图",
        "i18n": "地震构造图",
        "group": true,
        "hideInBreadcrumb": true,
        "children":[
          {
            "text": "区域地震构造图",
            "link": "/achievement/dgz",
            "i18n": "区域地震构造图",
            "icon": "anticon-block",
          },
          {
            "text": "区域大地构造分区图",
            "link": "/achievement/qdgz",
            "i18n": "区域大地构造分区图",
            "icon": "anticon-appstore",
          },
          {
            "text": "区域大地构造分区图",
            "link": "/achievement/jqdgz",
            "i18n": "近场区地震地质构造图",
            "icon": "anticon-borderless-table",
          },
          {
            "text": "区域大地构造分区图",
            "link": "/achievement/jqxdh",
            "i18n": "近场区新构造单元划分图",
            "icon": "anticon-build",
          },
          {
            "text": "区域大地构造分区图",
            "link": "/achievement/qxgz",
            "i18n": "区域新单元构造分区图",
            "icon": "anticon-appstore-add",
          },
        ]
      }]
    },
      {
        title: '震中分布图',
        icon: `${baseImgUrl}/idc/portal/identity.png`,
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
        "children": [{
          "text": "震中分布图",
          "i18n": "震中分布图",
          "group": true,
          "hideInBreadcrumb": true,
          "children":[
            {
              "text": "区域历史地震震中分布图",
              "link": "/achievement/qlzzf",
              "i18n": "区域历史地震震中分布图",
              "icon": "anticon-border-bottom",
            },
            {
              "text": "区域现代地震震中分布图",
              "link": "/achievement/qxzzf",
              "i18n": "区域现代地震震中分布图",
              "icon": "anticon-border-outer",
            },
            {
              "text": "近场区地震震中分布图",
              "link": "/achievement/jzzf",
              "i18n": "近场区地震震中分布图",
              "icon": "anticon-border-inner",
            }
          ]
        }]
      },
      {
        title: '地质纵剖面图',
        icon: `${baseImgUrl}/idc/portal/identity.png`,
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        readFile: '地质纵剖面图',
        navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      },
      {
        title: '钻孔柱状图',
        icon: `${baseImgUrl}/idc/portal/identity.png`,
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        readFile: '钻孔柱状图',
        navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      },
      {
        title: 'Amax区划图',
        icon: `${baseImgUrl}/idc/portal/identity.png`,
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        readFile: 'Amax区划图',
        navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      }]},
  {
    name:"钻孔资料及计算模型",
    list:[{
      title: '钻孔资料',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      "children": [{
        "text": "钻孔资料",
        "i18n": "钻孔资料",
        "group": true,
        "hideInBreadcrumb": true,
        "children":[
          {
            "text": "钻孔坐标",
            "link": "/dashboard/v1",
            "i18n": "钻孔坐标",
            "icon": "anticon-border-bottom",
          },
          {
            "text": "土工试验成果表",
            "link": "/dashboard/analysis",
            "i18n": "土工试验成果表",
            "icon": "anticon-border-outer",
          },
          {
            "text": "液化钻孔成果表",
            "link": "/dashboard/analysis",
            "i18n": "液化钻孔成果表",
            "icon": "anticon-border-inner",
          },
          {
            "text": "勘探点平面图",
            "link": "/dashboard/analysis",
            "i18n": "勘探点平面图",
            "icon": "anticon-border-inner",
          },
          {
            "text": "等效剪切波速和场地类别",
            "link": "/dashboard/analysis",
            "i18n": "勘探点平面图",
            "icon": "anticon-border-inner",
          },
          {
            "text": "岩土分层信息",
            "link": "/dashboard/analysis",
            "i18n": "岩土分层信息",
            "icon": "anticon-border-inner",
          },
          {
            "text": "物理力学性质指标",
            "link": "/dashboard/analysis",
            "i18n": "物理力学性质指标",
            "icon": "anticon-border-inner",
          },
          {
            "text": "动力学参数",
            "link": "/dashboard/analysis",
            "i18n": "动力学参数",
            "icon": "anticon-border-inner",
          },
        ]
      }]
    },{
    title: '土层计算模型',
    icon: `${baseImgUrl}/idc/portal/identity.png`,
    // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
    menu: 'menu.manage',
    auth: 'haveAuth',
    navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
    "children": [{
    "text": "震中分布图",
    "i18n": "震中分布图",
    "group": true,
    "hideInBreadcrumb": true,
    "children":[
      {
        "text": "区域历史地震震中分布图",
        "link": "/dashboard/v1",
        "i18n": "区域历史地震震中分布图",
        "icon": "anticon-border-bottom",
      },
      {
        "text": "区域现代地震震中分布图",
        "link": "/dashboard/analysis",
        "i18n": "区域现代地震震中分布图",
        "icon": "anticon-border-outer",
      },
      {
        "text": "近场区地震震中分布图",
        "link": "/dashboard/analysis",
        "i18n": "近场区地震震中分布图",
        "icon": "anticon-border-inner",
      }
    ]
  }]
}]},
  {
    name:"地震动参数",
    list:[{
      title: '地震动参数成果表',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      "children": [{
        "text": "地震动参数成果表",
        "i18n": "地震动参数成果表",
        "group": true,
        "hideInBreadcrumb": true,
        "children":[
          {
            "text": "基岩地震动参数成果表",
            "link": "/dashboard/v1",
            "i18n": "区域历史地震震中分布图",
            "icon": "anticon-border-bottom",
          },
          {
            "text": "地表地震动参数成果表",
            "link": "/dashboard/analysis",
            "i18n": "区域现代地震震中分布图",
            "icon": "anticon-border-outer",
          }
        ]
      }]
    }]},
  {
    name:"加速度时程",
    list:[{
      title: '基岩时程',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      "children": [{
        "text": "震中分布图",
        "i18n": "震中分布图",
        "group": true,
        "hideInBreadcrumb": true,
        "children":[
          {
            "text": "区域历史地震震中分布图",
            "link": "/dashboard/v1",
            "i18n": "区域历史地震震中分布图",
            "icon": "anticon-border-bottom",
          }
        ]
      }]
    }]},

];
// 参数查询
export const parameterList = [
  {
    name:"图层",
    list:[{
      title: '加载图层',
      icon: `${baseImgUrl}/idc/portal/user.png`,
      link: '/nomenu/amap',
      menu: 'menu.manage',
      moduleName: 'menu.manage.account',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-user.png`,
    }]},
  {
    name:"计算结果",
    list:[
      {
      title: '参数计算',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      "children": [{
        "text": "震中分布图",
        "i18n": "震中分布图",
        "group": true,
        "hideInBreadcrumb": true,
        "children":[
          {
            "text": "区域历史地震震中分布图",
            "link": "/dashboard/v1",
            "i18n": "区域历史地震震中分布图",
            "icon": "anticon-border-bottom",
          },
          {
            "text": "区域现代地震震中分布图",
            "link": "/dashboard/analysis",
            "i18n": "区域现代地震震中分布图",
            "icon": "anticon-border-outer",
          },
          {
            "text": "近场区地震震中分布图",
            "link": "/dashboard/analysis",
            "i18n": "近场区地震震中分布图",
            "icon": "anticon-border-inner",
          }
        ]
      }]
    },
      {
      title: '查询报告',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
      "children": [{
        "text": "震中分布图",
        "i18n": "震中分布图",
        "group": true,
        "hideInBreadcrumb": true,

      }]
    }]},
];
// 参数查询
export const helpList = [
  {
    name:"帮助",
    list:[
      {
      title: '关于',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
    },
      {
      title: '帮助',
      icon: `${baseImgUrl}/idc/portal/identity.png`,
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/nav-bar/nav-idCard.png`,
    }]},
];
