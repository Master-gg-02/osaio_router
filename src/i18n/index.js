import LocalizedStrings from 'react-native-localization'; // 2
import * as RNLocalize from 'react-native-localize'; 

import en from './en.json';
import zh from './zh_CN.json';
import es from './es.json';
import de from './de.json';
import fr from './fr.json';
import it from './it.json';
import ja from './ja.json';

const languages = { en, zh, es, de, fr, it, ja };
let arr =['en', 'zh', 'es', 'de', 'fr', 'it', 'ja' ]
let language = RNLocalize.getLocales()[0].languageCode
language=arr.includes(language)?language:'en'
export const translations = new LocalizedStrings(languages);
translations.setLanguage(language);