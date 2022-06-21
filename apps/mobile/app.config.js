let ENVIRONMENT = process.env.ENVIRONMENT

const logo = () => {
  let filePath = './assets/icon.png'
  if (ENVIRONMENT === 'prod') {
    return filePath
  } else if (ENVIRONMENT === 'beta') {
    filePath = './assets/icon-beta.png'
    return filePath
  } else if (ENVIRONMENT === 'staging') {
    filePath = './assets/icon-staging.png'
    return filePath
  } else ENVIRONMENT === 'development'
  filePath = './assets/icon-development.png'
  return filePath
}

export default {
  expo: {
    name: 'Quail',
    slug: 'quail',
    version: '1.0.0',
    orientation: 'portrait',
    icon: logo(),
    userInterfaceStyle: 'automatic',
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
      bundleIdentifier: `com.expotodolist.${ENVIRONMENT}`,
      requireFullScreen: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: `com.expotodolist.${ENVIRONMENT}`,
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
