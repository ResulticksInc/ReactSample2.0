import React from 'react';
import { View,StyleSheet, Text,Button,Platform } from 'react-native';
import BaseComponent from './BaseComponent';

export default class Notification extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			notificationList:[]
		  }
	}

	getNotification=() =>{
		NativeModules.ReReactNativeSDK.getNotification((notifications) => {
			let notificationList = [];

              if (Platform.OS != 'ios') {
                var list = JSON.parse(notifications);
                if(list.length > 0){
                  this.setState({notificationList:list});
                }
                
              } else {
                notificationList = notifications;
              }
              if (notificationList.length !== 0) {
                // Do your functionality
                this.setState({notificationList:notificationList});
                //alert(JSON.stringify(notificationList));
              }
		})
	}
	notificationDeleteByObj=() =>{
		//your selected notification
		let noteObj = this.state.notificationList[0];
		NativeModules.ReReactNativeSDK.deleteNotificationByObject(JSON.stringify(obj));
	}
	notificationDeleteByCampaignId=() => {
		var campaignId = notificationList[0].campaignId
	    var obj = JSON.stringify({ campaignId: campaignId })
	    NativeModules.ReReactNativeSDK.deleteNotificationByCampaignId(obj);

	}
	deleteNotificationByNotificationId = position => {
	    var notificationId = notificationList[0].notificationId
	    var obj = JSON.stringify({ notificationId: notificatioinId })
	    NativeModules.ReReactNativeSDK.deleteNotificationByNotificationId(obj);
	};
	
	getUnreadCount() {
		NativeModules.ReReactNativeSDK.getUnReadNotificationCount((count) => {
		})
	}
	getReadCount() {
		NativeModules.ReReactNativeSDK.getReadNotificationCount ((count) => {
	
		})
  
	}

	readNotification = () => {
		var notificationId = notificationList[0].notificationId
		NativeModules.ReReactNativeSDK.readNotification (notificationId,(count) => {
		})
	}

	unReadNotification = () => {
		var notificationId = notificationList[0].notificationId
		NativeModules.ReReactNativeSDK.unReadNotification (notificationId,(count) => {
		})
	}

	
	
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Notification  </Text>
				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.getNotification} title="Get Notification" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.notificationDeleteByObj} title="Notification Delete Obj" color="#FF6347" />
				</View>
				
				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				   <Button style={styles.Button} onPress={this.notificationDeleteByCampaignId} title="Delete Notification by campaignId" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				    <Button style={styles.Button} onPress={this.deleteNotificationByNotificationId} title="Delete Notification By Notiifcation Id" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				<Button style={styles.Button} onPress={this.getUnreadCount} title="Get UnRead Count" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
					<Button style={styles.Button} onPress={this.getReadCount} title="Get Read Count" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				    <Button style={styles.Button} onPress={this.readNotification} title="Read Notification" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
				<Button style={styles.Button} onPress={this.unReadNotification} title="UnRead Notification" color="#FF6347" />
				</View>

				<View style={{marginTop:10,width:"100%",height:40,margin:10}}>
					<Button style={styles.Button} onPress={this.getReadCount} title="Get Read Count" color="#FF6347" />
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
