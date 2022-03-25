// Copyright 2015-present 650 Industries. All rights reserved.

#import "EXAppFetcher+Private.h"

@import EXManifests;

NS_ASSUME_NONNULL_BEGIN

@protocol EXAppFetcherDevelopmentModeDelegate <NSObject>

- (void)appFetcher:(EXAppFetcher *)appFetcher didLoadBundleWithProgress:(EXLoadingProgress *)progress;

@end

@interface EXAppFetcherDevelopmentMode : EXAppFetcher

@property (nonatomic, weak) id<EXAppFetcherDevelopmentModeDelegate> developmentModeDelegate;

- (instancetype)initWithAppLoader:(EXAppLoader *)appLoader manifest:(EXManifestsManifest *)manifest;

- (void)forceBundleReload;

@end

NS_ASSUME_NONNULL_END
