# Selective rotation lock in iOS apps with Swift

*A guide on how to implement selective rotation lock on iOS apps*

Start by enabling Portrait, Landscape left and right oriention in your app settings.

In your `AppDelagate.swift` add:

```Swift
var enableAllOrientation = false

func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    if (enableAllOrientation == true){
        return UIInterfaceOrientationMask.allButUpsideDown
    }
    return UIInterfaceOrientationMask.portrait
}
```

This sets your app to not rotate by default.  
Then in your controller that you want to allow to rotate add:

```Swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    appDelegate.enableAllOrientation = true
}
    
override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    appDelegate.enableAllOrientation = false
        
    let value = UIInterfaceOrientation.portrait.rawValue
    UIDevice.current.setValue(value, forKey: "orientation")
}
```

This will enable rotation on the controller and then disable it again when you leave the controller and make the app rotate back to portrait mode.
You can easily make the app do the opposite by setting `enableAllOrientation` to `true` from the start and then swap the code in `viewWillAppear` and `viewWillDisappear`, basically forcing that single view to be in portrait, or any other orientation you want.

All of this was taken from these [two][a1] [answers][a2] to [this question][q] on Stack Overflow.

[q]: http://stackoverflow.com/questions/26357162/how-to-force-view-controller-orientation-in-ios-8 "How to force view controller orientation in iOS 8?"
[a2]: http://stackoverflow.com/questions/26357162/how-to-force-view-controller-orientation-in-ios-8/26358192#26358192 "How to force rotate the app"
[a1]: http://stackoverflow.com/questions/26357162/how-to-force-view-controller-orientation-in-ios-8/34881409#34881409 "How to stop it from rotating"
