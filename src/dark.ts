import browser from 'webextension-polyfill';
import { LOCAL_DARK } from '@/common/constants';

setDark();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setDark);

function setDark() {
  browser.storage.local.set({
    [LOCAL_DARK]: window.matchMedia('(prefers-color-scheme: dark)').matches,
  });
}
