#import "EXReactAppManager.h"

@import EXManifests;

FOUNDATION_EXPORT NSString *kEXHomeBundleResourceName;
FOUNDATION_EXPORT NSString *kEXHomeManifestResourceName;

@interface EXHomeAppManager : EXReactAppManager

+ (EXManifestsManifest *)bundledHomeManifest;

#pragma mark - interfacing with home JS

- (void)addHistoryItemWithUrl:(NSURL *)manifestUrl manifest:(EXManifestsManifest *)manifest;
- (void)getHistoryUrlForScopeKey:(NSString *)scopeKey completion:(void (^)(NSString *))completion;
- (void)showQRReader;

@end
