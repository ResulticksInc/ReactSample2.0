//
//  UIViewController+PushCategory.h
//  AwesomeProject
//
//  Created by Rajaram on 28/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//




#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
NS_ASSUME_NONNULL_BEGIN

@interface UIViewController (PushCategory)<UNUserNotificationCenterDelegate>
{
  
}
- (void)viewDidLoad;

@end

NS_ASSUME_NONNULL_END
