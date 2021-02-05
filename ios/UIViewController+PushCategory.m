//
//  UIViewController+PushCategory.m
//  AwesomeProject
//
//  Created by Rajaram on 28/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIViewController+PushCategory.h"

#import <UIKit/UIKit.h>

#import <UserNotifications/UserNotifications.h>


@implementation UIViewController (PushCategory)



- (void)viewDidLoad {
    
    // Do any additional setup after loading the view.
  double delayInSeconds = 10.0;
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    NSLog(@"Do some work");
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
     center.delegate = self;
     
     NSLog(@"UIViewController Notification Category");
   
  });
 
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
#if defined(__IPHONE_11_0)
         withCompletionHandler:(void(^)(void))completionHandler NS_AVAILABLE_IOS(10_0) {
#else
         withCompletionHandler:(void(^)())completionHandler NS_AVAILABLE_IOS(10_0) {
#endif
     //NSDictionary *message = [self parseUNNotificationResponse:response];
           
    // NSString *handlerKey = message[@"notification"][@"notificationId"];

   //  [self sendJSEvent:self name:NOTIFICATIONS_NOTIFICATION_OPENED body:message];
           
      double delayInSeconds = 5.0;
      dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
      dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
        NSLog(@"Do some work");
        UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"My Alert"
                                       message:@"This is an alert."
                                       preferredStyle:UIAlertControllerStyleAlert];

        UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
           handler:^(UIAlertAction * action) {}];

        [alert addAction:defaultAction];
                
                [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:alert animated:YES completion:nil];
      });
     
            
}

@end
