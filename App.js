/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, Platform ,Dimensions} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import BaseComponent from './BaseComponent';
import firebase, { Notification,NotificationOpen } from 'react-native-firebase';

var fcm_token = ""
export default class App extends BaseComponent {
	componentDidMount() {
		// FCM token Reciever
		firebase.messaging().getToken().then((fcmToken) => {
			fcm_token = fcmToken;
			if (fcmToken) {
				console.log(`\n\n **** FCM Token **** \n ${fcmToken} \n **** End \n\n`);
			}
		});
		/* Resulticks Push Handler */
		if (Platform.OS == 'ios') {
			this.resIosNotificationHandler();
		} else {
			this.resAndroidNotificationHandler();
		}
	}

	componentWillUnmount() {
		this.removeNotificationDisplayedListener();
		this.removeNotificationListener();
	}

	/* Resulticks Ios Notification Handler */
	resIosNotificationHandler() {
		// Foreground notification - iOS
		firebase.notifications().onNotification((obj) => {
			if (obj) {
				obj.actionIdentifier = obj.action;
				var resPayload = this.payloadConversion(obj);
				if (resPayload) {
					NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 1);
				}

				// Local Notification optional one
				const local_notification = new firebase.notifications.Notification()
					.setBody(resPayload._body)
					.setData(resPayload._data)
					.setNotificationId(resPayload._notificationId)
					.setTitle(resPayload._title);
				firebase.notifications().displayNotification(local_notification);
				// Do your functionality

				/*******/
			}
		});

		// Notification Open - iOS
		firebase.notifications().onNotificationOpened((obj) => {
			if (obj) {
				var notificationObject = obj.notification;
				notificationObject.actionIdentifier = obj.action;
				var resPayload = this.payloadConversion(notificationObject);
				if (resPayload) {
					NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 2);
				}
				console.log('Payload Receiver Opened' + resPayload);
				// Do your functionality
				let customParam = JSON.parse(resPayload._data.customParams);
				this.props.navigation.navigate(customParam.screenName);
				/*******/
			}
		});

		// Notification received when app open for the first time or from closed state - iOS

			firebase.notifications().getInitialNotification().then((obj) => {
				//

				if (obj) {
					console.log("Inside Receive Notification");

					var notificationObject = obj.notification;
					notificationObject.actionIdentifier = obj.action;
					var resPayload = this.payloadConversion(notificationObject);
					if (resPayload) {
						NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 3);
					}
					console.log('App first time Opened' + resPayload);
				// Do your functionality
				let customParam = JSON.parse(resPayload._data.customParams);
				this.props.navigation.navigate(customParam.screenName);
				}

				/*******/
			});


	}

	/* Resulticks Android Notification Handler */
	resAndroidNotificationHandler() {
		if (Platform.OS != 'ios') {
			DeviceEventEmitter.addListener('resulticksNotification', (payload) => {
				let customParam = JSON.parse(payload.customParams);
				this.props.navigation.navigate(customParam.screenName);
			});
		}
	}

	/* Notification payload conversion */
	payloadConversion(notfication) {
		var cache = [];
		var payload = JSON.stringify(notfication, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					return;
				}
				cache.push(value);
			}
			return value;
		});
		cache = null;
		return JSON.parse(payload);
	}

	/* User Register */
	register = () => {
		var resUser = {
			userUniqueId: 'lrajarammca@gmail.com',
			name: 'user-name',
			age: 'user-age',
			email: 'lrajarammca@gmail.com',
			phone: 'mobile-number',
			gender: 'user-gender',
			token: fcm_token,
			profileUrl: 'user-profile-url'
		};

		console.log('Register App.js' + JSON.stringify(resUser));

		NativeModules.ReReactNativeSDK.userRegister(JSON.stringify(resUser));

		// NativeModules.ReReactNativeSDK.getNotification().then(value => {
		// 	alert(value);
		// })


	};

	/* Custom Event */
	customEvent = () => {
		// Sending custom event
		// Custom event : event name and data both fully customizable for the user wish
		var customEventObject = {
			eventName: 'Your custom event name',
			data: {
				productId: 'Your product id',
				productName: 'Your product name'
			}
		};
		NativeModules.ReReactNativeSDK.customEvent(JSON.stringify(customEventObject));
	};

	// Screen tracking: Developer must pass screen name according to the presented screen
	userNavigation = () => {
		NativeModules.ReReactNativeSDK.screenNavigation('HomeScreen');
	};

	// Location update: Developer must pass(Live or required location) the location object with latitude and longitude key as a String format
	userlocationUpdate = () => {
		var lat = 13.123456789012345.toString();
		var long = 80.123456789012345.toString();
		var location = {
			latitude: 13.123456789012345,
			longitude: 80.123456789012345
		};
		var location1 = {
			latitude: lat,
			longitude: long
		};
		console.log("Location  = " +JSON.stringify(location));
		console.log("Lat = " +lat + "LONG"  +long);
		console.log("Location 1 " +JSON.stringify(location1));
		NativeModules.ReReactNativeSDK.locationUpdate(JSON.stringify(location1));
	};

	// Get notification list: Developer need to call this method to get notification list.
	getNotification = () => {
		this.props.navigation.navigate('Notification');
	}

	// Delete notification: Developer must pass selected notification object to delete
	deleteNotification = (position) => {
		let noteObj = { campaignId: '0001' };
		NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(noteObj));
	};

	appConversation = (position) => {
		//please replace withyour app id
		NativeModules.ReReactNativeSDK.appConversionTracking(JSON.stringify(noteObj));
	};

	

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Welcome to Resulticks App!! </Text>
				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.register} title="register" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.customEvent} title="customEvent" color="#FF6347" />
				</View>
				
				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.userNavigation} title="screen Tracking" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				    <Button style={styles.Button} onPress={this.userlocationUpdate} title="Locaction Update" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				<Button style={styles.Button} onPress={this.getNotification} title="Notification" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
					<Button style={styles.Button} onPress={this.appConversation} title="Custom / App Conversation" color="#FF6347" />
				</View>
				
				
				
				
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	title: {
	  textAlign: 'center',
	  marginVertical: 8,
	},
	button:{
		marginBottom: 20,
		padding: 30  
	},
	space: {
		width: 20, // or whatever size you need
		height: 20,
	  },
	fixToText: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	},
	separator: {
	  marginVertical: 8,
	  borderBottomColor: '#737373',
	  borderBottomWidth: StyleSheet.hairlineWidth,
	},
  });
