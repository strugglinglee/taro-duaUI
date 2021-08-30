import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";

import PopTip from "../../components/poptip";

export default function Index() {
  return (
    <View className='index'>
      <PopTip className='item' text='poptip-top' placement='top'>
        <Text>上</Text>
      </PopTip>
      <PopTip className='item' text='poptip-left' placement='left'>
        <Text>左</Text>
      </PopTip>
      <PopTip className='item' text='poptip-right' placement='right'>
        <Text>右</Text>
      </PopTip>
      <PopTip className='item' text='poptip-bottom' placement='bottom'>
        <Text>下</Text>
      </PopTip>
    </View>
  );
}
