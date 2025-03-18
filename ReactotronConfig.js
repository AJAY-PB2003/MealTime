import Reactotron, {asyncStorage} from 'reactotron-react-native';

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

// ReactotronConfig.js
import {reactotronRedux} from 'reactotron-redux';

// then add it to the plugin list
const reactotron = Reactotron.configure({name: 'React Native Demo'})
  .use(reactotronRedux())
  .use(asyncStorage()) //  <- here i am!
  .connect(); //Don't forget about me!

export default reactotron; // also: export me so I can be referenced by Redux store
