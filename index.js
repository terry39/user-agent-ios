import React from 'react';
import { AppRegistry, YellowBox, NativeModules } from 'react-native';
import './ReactNative/js/setup-globals';
import App from 'browser-core-user-agent-ios/build/modules/core/app';
import inject from 'browser-core-user-agent-ios/build/modules/core/kord/inject';
import { addConnectionChangeListener } from 'browser-core-user-agent-ios/build/modules/platform/network';
import events from 'browser-core-user-agent-ios/build/modules/core/events';
import Home from './ReactNative/js/screens/Home';
import SearchResults from './ReactNative/js/screens/SearchResults';
import BridgeManager from './ReactNative/js/bridge-manager';

YellowBox.ignoreWarnings([
  'Warning: NetInfo', // TODO: use netinfo from community package
]);

export class BrowserCore extends App {
  constructor(browser) {
    super({ browser });
  }
}

const app = new BrowserCore(global.browser);
app.start();

global.CLIQZ = {
  app,
};

addConnectionChangeListener();

const bridgeManager = new BridgeManager(NativeModules.JSBridge, inject);

AppRegistry.registerComponent('BrowserCore', () => class extends React.Component {});
AppRegistry.registerComponent('Home', () => Home);
AppRegistry.registerComponent('SearchResults', () => () => <SearchResults bridgeManager={bridgeManager} events={events} />);