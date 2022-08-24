export default {
  expo: {
    name: 'Quail',
    slug: 'quail',
    orientation: 'default',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      versionCode: 5,
      package: 'com.expotodolist.production',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.expotodolist.production',
      requireFullScreen: true,
      buildNumber: '5',
    },
    updates: {
      url: 'https://u.expo.dev/91564486-4c0f-42aa-b8cb-19cd4effef64',
    },
    extra: {
      eas: {
        projectId: '91564486-4c0f-42aa-b8cb-19cd4effef64',
      },
    },
  },
}
