/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Elements from 'logmei-react-native-elements';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <View style={{width: '100%', height: 300}}>
      <Text>222222</Text>
      {/* <Elements.Divider type="dashed" /> */}
      <Elements.Images
        datas={[
          'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF',
          'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF',
        ]}
      />
      <Elements.Spinner visible={true} setVisible={() => console.log(11)} />
    </View>
  );
};

export default App;
