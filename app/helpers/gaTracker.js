import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
import { GA } from '../config';

GoogleAnalyticsSettings.setDispatchInterval(30);
GoogleAnalyticsSettings.setDryRun(false);

module.exports = new GoogleAnalyticsTracker(GA);