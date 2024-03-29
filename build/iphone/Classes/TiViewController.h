/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2018 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import <UIKit/UIKit.h>
#import "TiControllerProtocols.h"

@interface TiViewController : UIViewController {

    TiViewProxy* _proxy;
    TiOrientationFlags _supportedOrientations;
}

@property(nonatomic,retain) NSArray *previewActions;

-(id)initWithViewProxy:(TiViewProxy*)window;
-(TiViewProxy*) proxy;

@end
