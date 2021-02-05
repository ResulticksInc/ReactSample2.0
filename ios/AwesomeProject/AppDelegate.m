/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTRootContentView.h>

#import <REIOSSDK/REIOSSDK.h>
#import <UserNotifications/UserNotifications.h>

#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"

#import "ReReactNativeSDK.h"





@import Firebase;


@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  REiosHandler.debug = YES;
  //REiosHandler.printAny = YES;
  [self registerNotificationForFcm:application];
  [self initReiossdk];
  NSString *message = @"defalut";
//  if (launchOptions!=nil) {
//  NSMutableDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
//  NSLog(@"userInfo===%@", userInfo);
//  if (userInfo.count>=1) {
//
//      NSDictionary *apsInfo = [userInfo objectForKey:@"aps"];
//      NSLog(@"Received apsInfo Badge: %@", apsInfo);
//    message = @"userInfo";
//    UIAlertView *alertView = [[UIAlertView alloc]initWithTitle:@"Test" message:@"TestMessage" delegate:nil cancelButtonTitle:@"Cancel" otherButtonTitles:nil, nil];
//    [alertView show];
//    //[ReReactNativeSDK setString:message];
//    //[ReReactNativeSDK notificationMessage] = @"userInfo";
//
//  }
//  else{
//     NSLog(@"userInfo Null");
//    UIAlertView *alertView = [[UIAlertView alloc]initWithTitle:@"Test 1" message:@"TestMessage 1" delegate:nil cancelButtonTitle:@"Cancel" otherButtonTitles:nil, nil];
//       [alertView show];
//  }
// }
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"AwesomeProject"
                                            initialProperties:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  
  rootViewController.view = rootView;//[self showAlert:message];
  self.window.rootViewController = rootViewController;
  
  NSLog(@"view controller hierarchy %@", self.window.rootViewController.view);
  [self.window makeKeyAndVisible];
  
  
  
  
  return YES;
}

-(UIView *)showAlert:(NSString *)message{
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"My Alert"
                                 message:@"This is an alert."
                                 preferredStyle:UIAlertControllerStyleAlert];

  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
     handler:^(UIAlertAction * action) {}];

  [alert addAction:defaultAction];
  
  return alert.view;
  //[self presentViewController:alert animated:YES completion:nil];
}


- (void)registerNotificationForFcm:(UIApplication *)application {
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    // [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    [[UNUserNotificationCenter currentNotificationCenter]
     requestAuthorizationWithOptions:authOptions
     completionHandler:^(BOOL granted, NSError * _Nullable error) {
      // ...
    }];
    [FIRApp configure];
    
    [FIRMessaging messaging].delegate = self;
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  
  [application registerForRemoteNotifications];
}

- (void)initReiossdk {
  
  UNNotificationAction *acceptAction = [UNNotificationAction actionWithIdentifier:@"accept"
                                                                            title:@"Save"
                                                                          options:UNNotificationActionOptionForeground];
  UNNotificationAction *declineAction = [UNNotificationAction actionWithIdentifier:@"decline"
                                                                             title:@"Decline"
                                                                           options:UNNotificationActionOptionDestructive];
  UNNotificationAction *snoozeAction = [UNNotificationAction actionWithIdentifier:@"snooze"
                                                                            title:@"Snooze"
                                                                          options:UNNotificationActionOptionDestructive];
  NSArray *notificationActions = @[ acceptAction, declineAction, snoozeAction ];
  
  // create a category
  UNNotificationCategory *inviteCategory = [UNNotificationCategory categoryWithIdentifier:@"CYLInviteCategoryIdentifier" actions:notificationActions intentIdentifiers:@[] options:UNNotificationCategoryOptionNone];
  NSSet *categories = [NSSet setWithObject:inviteCategory];
  //REiosHandler.isBaseUrl = 2;
  [REiosHandler initWithApiWithApiKey:@"6087064d-c0fe-45ec-b5cd-380177251baf" registerNotificationCategory: categories];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
