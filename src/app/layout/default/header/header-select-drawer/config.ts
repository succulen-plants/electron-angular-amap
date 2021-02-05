/**
 * link 没有自菜单， 直接跳转
 * readFile： 需要通过读取文件列表获取菜单
 */

import { environment } from '@env/environment';

const {  baseUrl } = environment;

const baseImgUrl = `${baseUrl}/assets`;

// 成果展示
export const achievementList = [
  {
    name:"图建成果",
    list:[{
      title: '地震构造图',
      menu: 'menu.manage',
      moduleName: 'menu.manage.account',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/icons/地震构造图.png`,
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
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        navImg: `${baseImgUrl}/icons/震中分布图.png`,
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
        navImg: `${baseImgUrl}/icons/地质纵剖面图.png`,
      },
      {
        title: '钻孔柱状图',
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        readFile: '钻孔柱状图',
        navImg: `${baseImgUrl}/icons/钻孔柱状图.png`,
      },
      {
        title: 'Amax区划图',
        // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
        menu: 'menu.manage',
        auth: 'haveAuth',
        readFile: 'Amax区划图',
        navImg: `${baseImgUrl}/icons/Amax区划图.png`,
      }]},
  {
    name:"钻孔资料及计算模型",
    list:[{
      title: '钻孔资料',
      // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/icons/钻孔资料.png`,
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
    // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
    menu: 'menu.manage',
    auth: 'haveAuth',
      navImg: `${baseImgUrl}/icons/土层计算模型.png`,
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
      navImg: `${baseImgUrl}/icons/地震动参数成果表.png`,
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
      // path: `${mgtOrigin}/iotPlant/#/home?quickstart=632`\
      menu: 'menu.manage',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/icons/基岩时程.png`,
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
      link: '/nomenu/amap',
      menu: 'menu.manage',
      moduleName: 'menu.manage.account',
      auth: 'haveAuth',
      navImg: `${baseImgUrl}/icons/加载图层.png`,
    }]},
  {
    name:"计算结果",
    list:[
      {
      title: '参数计算',
      menu: 'menu.manage',
      auth: 'haveAuth',
        navImg: `${baseImgUrl}/icons/参数计算.png`,
    },
      {
      title: '查询报告',
      menu: 'menu.manage',
      auth: 'haveAuth',
        navImg: `${baseImgUrl}/icons/查询报告.png`,
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
      menu: 'menu.manage',
      auth: 'haveAuth',
        navImg: `${baseImgUrl}/icons/关于.png`,
    },
      {
      title: '帮助',
      menu: 'menu.manage',
      auth: 'haveAuth',
        navImg: `${baseImgUrl}/icons/帮助.png`,
    }]},
];
