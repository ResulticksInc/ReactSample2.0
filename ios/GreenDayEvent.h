//
//  GreenDayEvent.h
//  AwesomeProject
//
//  Created by Sivakumar R on 27/05/20.
//  Copyright © 2020 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface GreenDayEvent : RCTEventEmitter

- (void)sendMyEvent:(NSString *)notification;

@end

NS_ASSUME_NONNULL_END
