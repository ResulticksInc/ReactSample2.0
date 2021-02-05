/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, AsyncStorage, Platform,Linking } from 'react-native';
import { DeviceEventEmitter,NativeEventEmitter } from 'react-native';
import Notification from './Notification';

import Profile from './Profile';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';
import BaseComponent from './BaseComponent';
import App from './App';
import firebase from 'react-native-firebase';
import RemoteMessage from 'react-native-firebase';
import Constants from './Constants';

const { ReReactNativeSDK } = NativeModules
const resuticksEventEmitter = new NativeEventEmitter(ReReactNativeSDK)


// Resulticks Notification user tap Payload Receiver
if (Platform.OS != 'ios') {
	DeviceEventEmitter.addListener('resulticksNotification', (event) => {
		alert("Android Notification Tapped" + event);
		// let customParam = JSON.parse(event.customParams);
		// Constants.setScreenName(customParam.screenName);
	});
}else {
	resuticksEventEmitter.addListener("smartLinkNotificationData", (smartLinkData) => {
		alert("iOS Notification Tapped" + smartLinkData);
	   // Do your work
	})
}
//

// Dynamic Link Receiver for Android

if(Platform.OS != 'ios'){
	Linking.getInitialURL().then(url => {
		console.log("URL :" +url)
		NativeModules.ReReactNativeSDK.handleQrLink(url,(error,res) => {
		  alert("Response :" +res);
		})
	  });
}


const AppNavigator = createStackNavigator({
	App: {
		screen: App
	},
	Notification: {
		screen: Notification
	}
});

export default createAppContainer(AppNavigator);
