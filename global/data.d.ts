/**
 * tabbar的context
 */
export interface TabRootContextProps {
  /**
   * tabIndex:选中的项
   */
  tabIndex: number;
  /**
   * toggleTab:选中项触发的方法
   */
  toggleTab: Function;
  /**
   * tabDatas:数据
   */
  tabDatas: TabItemProps[];
}

export interface TabItemProps {
  icon: 'record' | 'home';
  label: string;
  pageName?: string;
  focused?: boolean;
}

export interface DataProps {
  name: string;
  label: string;
  value: string;
}
