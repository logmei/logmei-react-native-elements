import {StandardPxToDp, pxToDp} from '../utils';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  InteractionManager,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';

const Height = () => {
  return Dimensions.get('window').height;
};

const Width = () => {
  return Dimensions.get('window').width;
};

interface StateType {
  transCode: string; // 条码
  typeCode: string; // 条码类型
  showCode: boolean;
  imagePath: string; // 拍照图片
  animateCode: any;
  planId: string;
  loading: boolean;
}

interface PropsType {
  navigation: any;
  route: any;
}

let animateObj: Animated.CompositeAnimation;
class BarCodePage extends Component<PropsType, StateType> {
  state = {
    transCode: '', // 条码
    typeCode: '', // 条码类型
    showCode: true,
    imagePath: '', // 拍照图片
    animateCode: new Animated.Value(10),
    planId: '', // 计划id
    loading: false,
  };
  camera: any;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.startAnimation();
    });
    // const {route} = this.props;
    // const {id} = route.params;
    // if (id) {
    //   this.setState({planId: id});
    //   //console.log('进入----planId---', id);
    // }
  }

  // 动画开始
  startAnimation = () => {
    this.state.animateCode.setValue(0);
    animateObj = Animated.timing(this.state.animateCode, {
      toValue: 1, // 运动终止位置，比值
      duration: 2500, // 动画时长
      easing: Easing.linear, // 线性的渐变函数
      delay: 0.3, // 在一段时间之后开始动画（单位是毫秒），默认为0
      useNativeDriver: true,
    });
    animateObj.start(() => this.startAnimation());
  };

  barcodeReceived = (e: any) => {
    let that = this;
    if (this.state.showCode) {
      //console.log(e);
      that.setState({
        transCode: e.data,
        typeCode: e.type,
        showCode: false,
      });
      if (e.data) {
        // let barCodeData = {
        //   typeName: 'testScan', // TestPage获取此值
        //   typeValue: e.data,
        // };
        // console.log('barCodeData', barCodeData);
        this.takePicture();
        // that.props.navigation.navigate('TestPage', {barCodeData});;
      }
    }
  };

  // 关闭扫一扫
  closeScanPage = () => {
    this.props.navigation.navigate('Task');
  };

  /*
   * 点击拍照
   * */
  takePicture = async () => {
    //console.log('takePicture');
    //jpegQuality 1-100, 压缩图片
    const options = {jpegQuality: 50};
    if (this.camera) {
      const data = await this.camera.takePictureAsync(options);
      //console.log('uri');
      /*图片本地路径*/
      this.setState({
        imagePath: data.uri,
      });

      /*获取图片大小*/
      // Image.getSize(data.uri, (width, height) => {
      //   console.log(width, height);
      // });
      this.props.navigation.navigate('VideoDetail', {
        imagePath: data.uri,
        id: this.state.planId,
      });
      //   this.camera
      //     .capture({options})
      //     .then((data: any) => {
      //       console.log(data);

      //       /*图片本地路径*/
      //       this.setState({
      //         imagePath: data.path,
      //       });

      //       /*获取图片大小*/
      //       Image.getSize(data.path, (width, height) => {
      //         console.log(width, height);
      //       });
      //     })
      //     .catch((err: any) => console.error(err));
      //
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />

        <SafeAreaView style={styles.container}>
          <RNCamera
            ref={cam => (this.camera = cam)}
            // onBarCodeRead={this.barcodeReceived.bind(this)}
            onCameraReady={() => {
              //console.log('ready');
            }}
            permissionDialogTitle={'提示信息'}
            permissionDialogMessage={
              'APP需要使用相机，请打开相机权限允许APP使用'
            }
            style={styles.scan_camera}>
            <View style={styles.scan_cont_box}>
              <View style={styles.scan_cont_circle}>
                <Animated.View
                  style={{
                    alignItems: 'center',
                    transform: [
                      {
                        // translateX: x轴移动
                        // translateY: y轴移动
                        translateY: this.state.animateCode.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 140],
                        }),
                      },
                    ],
                  }}>
                  <Text style={styles.scan_circle_init} />
                </Animated.View>
                <View style={styles.scan_cant_coner1} />
                <View style={styles.scan_cant_coner2} />
                <View style={styles.scan_cant_coner3} />
                <View style={styles.scan_cant_coner4} />
              </View>
              <Text style={styles.scan_info}>请将识别信息对准识别框内</Text>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: pxToDp(138),
                alignItems: 'center',
                backgroundColor: 'rgba(16, 16, 16, 0.85)',
              }}>
              <Text
                style={{
                  fontSize: pxToDp(15),
                  color: 'rgba(255, 255, 255, 0.75)',
                  letterSpacing: 2,
                  fontWeight: '600',
                  marginBottom: pxToDp(19),
                  marginTop: pxToDp(10),
                }}>
                拍照
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: pxToDp(64),
                  top: pxToDp(68),
                }}
                activeOpacity={0.8}
                onPress={this.closeScanPage}>
                <Icon
                  name="downcircle"
                  size={26}
                  color="#C9C9C9"
                  style={{
                    opacity: 0.71,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.takePicture.bind(this)}>
                <View style={styles.capture_1}>
                  <View style={styles.capture_2}>
                    <View style={styles.capture_3} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/*拍照完毕，显示图片到界面上*/}
          </RNCamera>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scan_camera: {
    flex: 1,
    height: Height(),
  },
  scan_cont_box: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scan_cont_circle: {
    top: StandardPxToDp(112),
    width: StandardPxToDp(321),
    height: StandardPxToDp(169),
    // borderWidth: 1,
    // borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scan_circle_init: {
    width: StandardPxToDp(311),
    height: StandardPxToDp(2),
    backgroundColor: '#266FFF',
  },

  scan_info: {
    marginTop: StandardPxToDp(170),
    color: 'rgba(255, 255, 255, 0.75)',
  },
  info: {
    width: Width(),
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
  capture_1: {
    width: StandardPxToDp(68),
    height: StandardPxToDp(68),
    borderRadius: StandardPxToDp(68),
    backgroundColor: '#fff',
    opacity: 0.92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture_2: {
    width: StandardPxToDp(64),
    height: StandardPxToDp(64),
    borderRadius: StandardPxToDp(64),
    backgroundColor: 'rgb(0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture_3: {
    width: StandardPxToDp(58),
    height: StandardPxToDp(58),
    borderRadius: StandardPxToDp(58),
    backgroundColor: '#CC0000',
    opacity: 0.92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scan_cant_coner1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: StandardPxToDp(20),
    height: StandardPxToDp(10),
    borderTopColor: '#266FFF',
    borderTopWidth: StandardPxToDp(3),
    borderLeftColor: '#266FFF',
    borderLeftWidth: StandardPxToDp(3),
  },
  scan_cant_coner2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: StandardPxToDp(20),
    height: StandardPxToDp(10),
    borderTopColor: '#266FFF',
    borderTopWidth: StandardPxToDp(3),
    borderRightColor: '#266FFF',
    borderRightWidth: StandardPxToDp(3),
  },
  scan_cant_coner3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: StandardPxToDp(20),
    height: StandardPxToDp(10),
    borderBottomColor: '#266FFF',
    borderBottomWidth: StandardPxToDp(3),
    borderLeftColor: '#266FFF',
    borderLeftWidth: StandardPxToDp(3),
  },
  scan_cant_coner4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: StandardPxToDp(20),
    height: StandardPxToDp(10),
    borderBottomColor: '#266FFF',
    borderBottomWidth: StandardPxToDp(3),
    borderRightColor: '#266FFF',
    borderRightWidth: StandardPxToDp(3),
  },
});

export default BarCodePage;
