import UIKit
import AppAuth
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import GoogleMaps
import RNBootSplash


@main
class AppDelegate: UIResponder, UIApplicationDelegate ,RNAppAuthAuthorizationFlowManager {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?
  var authorizationFlowManagerDelegate: RNAppAuthAuthorizationFlowManagerDelegate?
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {

    GMSServices.provideAPIKey("AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA")

    FirebaseApp.configure()
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "BandMate",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    // Handle redirect from AppAuth
    if let authorizationFlowManagerDelegate = self.authorizationFlowManagerDelegate {
      if authorizationFlowManagerDelegate.resumeExternalUserAgentFlow(with: url) {
        return true
      }
    }
    return false
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
