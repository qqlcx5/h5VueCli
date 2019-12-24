import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import elEnLocale from 'element-ui/lib/locale/lang/en';
import elZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import elZhTWLocale from 'element-ui/lib/locale/lang/zh-TW';
import elKoLocale from 'element-ui/lib/locale/lang/ko';
import enLocale from './en';
import zhLocale from './zh-CN';
import zhtwLocale from './zh-TW';
import koLocale from './ko';

Vue.use(VueI18n);

const messages = {
  'zh-CN': { // 中文简体包
    ...zhLocale,
    ...elZhLocale
  },
  'zh-TW': { // 中文繁体包
    ...zhtwLocale,
    ...elZhTWLocale,
  },
  en: { // 英文包
    ...enLocale,
    ...elEnLocale
  },
  ko: {
    ...elKoLocale,
    ...koLocale
  }
};
const i18n = new VueI18n({
  locale: store.state.app.language, // set locale
  messages // locale messages
});

export default i18n;
