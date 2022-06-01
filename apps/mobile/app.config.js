const IS_DEV = process.env.APP_VARIANT === 'development'

export default {
  expo: {
    name: 'Quail',
    slug: 'expo-to-do-list',
    version: '1.0.0',
    orientation: 'portrait',
    icon: IS_DEV ? './assets/icon-development.png' : './assets/icon-beta.png',
    userInterfaceStyle: 'automatic',
    jsEngine: 'hermes',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.expotodolist.dev' : 'com.expotodolist.beta',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: IS_DEV ? 'com.expotodolist.dev' : 'com.expotodolist.beta',
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
