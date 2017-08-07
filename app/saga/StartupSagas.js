import { put, select } from 'redux-saga/effects';
import SettingsActions from '../redux/SettingsRedux';

export const selectLanguage = state => state.settings.language // get the language from the settings reducer

// process STARTUP actions
export function* startup(action) {
  const language = yield select(selectLanguage);

  // Always set the I18n locale to the language in the settings, or the views would render in the language of the device's locale and not that of the setting.
  yield put(SettingsActions.changeLanguage(language));
}