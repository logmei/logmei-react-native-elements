import {BottomTabIcon} from '../images/svg_source';
import {pxToDp} from '../utils';
import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import { TabRootContextProps } from '../global/data';

export const RootContext = React.createContext<TabRootContextProps>({
  tabIndex: 0,
  toggleTab: (_: number) => {},
  tabDatas: [],
});

export interface TabItemProps {
  icon: 'record' | 'home';
  label: string;
  pageName?: string;
  focused?: boolean;
}

interface BottomTabBarProps {
  isNavigate?: boolean;
  onChecked?: (index: number) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  isNavigate = true,
  onChecked,
}) => {
  const navigation = useNavigation<any>();
  const {toggleTab, tabDatas} = useContext(RootContext);
  const handlerChecked = (v: TabItemProps, index: number) => {
    if (isNavigate) {
      navigation.navigate(v.pageName || 'home');
    } else {
      onChecked && onChecked(index);
    }
    toggleTab(index);
  };
  return (
    <View style={styles.tab}>
      {tabDatas.map((v, index: number) => {
        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={v.label}
            activeOpacity={1}
            onPress={() => {
              handlerChecked(v, index);
            }}>
            <SvgXml
              xml={BottomTabIcon[v.icon](v.focused || false)}
              style={{width: pxToDp(25), height: pxToDp(25)}}
            />
            <Text style={[styles.text, v.focused && styles.checked]}>
              {v.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: pxToDp(50),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  tabItem: {
    alignItems: 'center',
  },
  text: {
    fontSize: pxToDp(10),
    color: '#949494',
    fontWeight: '400',
  },
  checked: {
    color: '#266FFF',
  },
});

export default BottomTabBar;
