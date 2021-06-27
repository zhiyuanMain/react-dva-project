import { PanelListItem } from 'src/components/panel-list'
import { TabItem } from 'src/components/tab-box'
import { getTodayYMD } from 'src/utils/helper'

export function mockTabItem(title: string, len = 10): TabItem {
  return {
    tabTitle: title,
    list: mockPanelList(title, len)
  }
}

const MockHref = [
  '市农业农村局获2019年度全市目标责任考核优秀等次',
  '李克强栗战书汪洋王沪宁赵乐际韩正分别看望出席全国政协十三李克强栗战书汪洋王沪宁赵乐际韩正分别看望出席全国政协十三',
  '深入贯彻党中央决策部署 狠抓各项工作落实 努力实现全面建成深入贯彻党中央决策部署',
  '十三届全国人大三次会议在京开幕 习近平汪洋王沪宁赵乐际韩',
  '政府工作报告（文字实录）',
  '广泛凝聚共识 决胜全面小康 ——热烈祝贺全国政协十三届三热烈祝贺全国政协十三届三',
  '扶贫大棚喜获丰收',
  '国家发展改革委各级党组织举办系列活动隆重庆祝建党99周年',
  '榆林市农业农村局2020年部门综合预算',
  '国家发展改革委党组召开扩大会议'
]
export function mockPanelList(title: string, len: number): PanelListItem[] {
  const listData: PanelListItem[] = []
  for (let index = 0; index < len; index++) {
    listData.push({
      url: `/article/${index}`,
      id: `${index}`,
      title: new Array(index + 1).fill(`${title}__${MockHref[index % 10]}`).join(''),
      time: getTodayYMD()
    })
  }
  return listData
}
