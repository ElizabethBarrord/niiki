//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.miamination.2017Niiki";
NSString * const TI_APPLICATION_PUBLISHER = @"Miami Tribe of Oklahoma";
NSString * const TI_APPLICATION_URL = @"http://myaamiacenter.org/";
NSString * const TI_APPLICATION_NAME = @"Niiki";
NSString * const TI_APPLICATION_VERSION = @"2.2.1";
NSString * const TI_APPLICATION_DESCRIPTION = @"niiki";
NSString * const TI_APPLICATION_COPYRIGHT = @"2013 by Miami Tribe of Oklahoma";
NSString * const TI_APPLICATION_GUID = @"7ef858f4-d71b-412c-9222-6335d9625a18";
BOOL const TI_APPLICATION_ANALYTICS = true;
BOOL const TI_APPLICATION_SHOW_ERROR_CONTROLLER = true;
NSString * const TI_APPLICATION_BUILD_TYPE = @"";

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
