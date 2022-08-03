<h1 align="center"> ✏️ Quail 🐦 </h1>

[Quail](https://quailapp.vercel.app/) is a minimalist [React Native](https://reactnative.dev/), [Expo](https://docs.expo.dev/guides/) mobile to do list application. Built with a [monorepo](https://www.atlassian.com/git/tutorials/monorepos) architecture, and [yarn workspaces](https://yarnpkg.com/features/workspaces).

### By [Isaac Moreno](https://www.linkedin.com/in/isaacrmoreno/) 👨‍💻

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Setup

1. Clone the `expo-to-do-list` repository.

```
git clone https://github.com/isaacrmoreno/expo-to-do-list.git
```

2. From the root directory install the node_modules with `yarn`.

3. Either run...

   - `yarn start` from the root directory or...
   - `expo start` from the apps/mobile directory...
     and you should be off to the races and ready for development! 🏇

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Styling

The application utilizes inline styling with [twrnc](https://github.com/jaredh159/tailwind-react-native-classnames).

```
import { View, Text } from 'react-native';
import tw from 'twrnc';

const MyComponent = () => (
  <View style={tw`p-4 bg-white`}>
    <Text style={tw`text-md text-black`}>Hello World</Text>
  </View>
);
```

#### Dark Mode

We use React Natives [useColorScheme](https://reactnative.dev/docs/usecolorscheme) hook for dark mode.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Connect with me:

<a href="https://www.linkedin.com/in/isaacrmoreno/">
<img src=https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmyclouddoor.com%2Fwp-content%2Fuploads%2F2019%2F11%2FLinkedin-logo.png&f=1&nofb=1  height="40" style="vertical-align:top; margin:4px" alt="Follow @isaacrmoreno on Linkedin"> 
</a>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Support ☕

Like Quail? Let us know!

<a href="https://www.buymeacoffee.com/N3j19RC0nH">
  <img src="./apps/mobile/assets/bmc-button.png" alt="Buy Me a Coffee Logo" height="50"/>
</a>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Technologies Used 💾

<div>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScipt" height="45" style="vertical-align:top; margin:4px">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" alt="React" height="45" style="vertical-align:top; margin:4px">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" height="45" style="vertical-align:top; margin:4px">

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/yarn/yarn-original.svg" alt="Yarn" height="45" style="vertical-align:top; margin:4px">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" alt="Terminal" height="45" style="vertical-align:top; margin:4px">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" alt="VS Code" height="45" style="vertical-align:top; margin:4px">
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2>Copyright and License ⚖️</h2>

[MIT License](https://github.com/isaacrmoreno/expo-to-do-list/blob/main/License) &copy; 2022 Isaac Moreno
