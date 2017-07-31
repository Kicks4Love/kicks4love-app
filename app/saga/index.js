import { takeLatest } from 'redux-saga/effects';

/* ------------- Types ------------- */
import { StartupTypes } from '../redux/StartupRedux';
import { SettingsTypes } from '../redux/SettingsRedux';

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas';
import { updateLanguage } from './SettingsSaga';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield[
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SettingsTypes.CHANGE_LANGUAGE, updateLanguage)
  ]
}
