import browser from 'webextension-polyfill';
import { type SystemProxy, type UserProxyRule } from '@/common/types';
import {
  DEFAULT_SYSTEM_PROXY,
  LOCAL_DISABLED,
  LOCAL_USER_PROXY_RULES,
  LOCAL_SYSTEM_PROXY,
  LOCAL_DARK,
} from '@/common/constants';
import { generatePacScript } from '@/utils/pac';
import { debounce } from '@/utils/debounce';

watchEvents();
watchStorage();

function watchEvents() {
  const update = () => {
    updateIcons();
    updateProxy();
  };
  browser.runtime.onInstalled.addListener(update);
  browser.runtime.onStartup.addListener(update);
  browser.management.onEnabled.addListener((info) => {
    if (info.id === browser.runtime.id) update();
  });
  browser.management.onDisabled.addListener((info) => {
    if (info.id === browser.runtime.id) {
      browser.proxy.settings.clear({
        scope: 'regular',
      });
    }
  });
}

function watchStorage() {
  browser.storage.local.onChanged.addListener((changes) => {
    if (changes[LOCAL_DISABLED] || changes[LOCAL_DARK]) {
      updateIcons();
    }
    if (changes[LOCAL_DISABLED] || changes[LOCAL_USER_PROXY_RULES] || changes[LOCAL_SYSTEM_PROXY]) {
      updateProxy();
    }
  });
}

const updateIcons = debounce(async () => {
  const { isDark, isDisabled } = await getThemeStorage();
  const state = `${isDark ? '.dark' : ''}${isDisabled ? '.disabled' : ''}`;
  const path = [16, 32, 48, 64, 128].reduce(
    (acc, size) => {
      acc[size] = `icons/${size}${state}.png`;
      return acc;
    },
    {} as Record<string, string>,
  );

  browser.action.setIcon({
    path,
  });
});

const updateProxy = debounce(async () => {
  const { isDisabled, userProxyRules, systemProxy } = await getProxyStorage();
  if (!isDisabled && userProxyRules.length) {
    browser.proxy.settings.set({
      value: generatePacScript(userProxyRules, systemProxy),
      scope: 'regular',
    });
  } else {
    browser.proxy.settings.clear({
      scope: 'regular',
    });
  }

  browser.action.setBadgeText({
    text: !isDisabled && !userProxyRules.length ? '?' : '',
  });
});

async function getThemeStorage() {
  const values = (await browser.storage.local.get({
    [LOCAL_DARK]: false,
    [LOCAL_DISABLED]: false,
  })) as {
    [LOCAL_DARK]: boolean;
    [LOCAL_DISABLED]: boolean;
  };

  return {
    isDark: values[LOCAL_DARK],
    isDisabled: values[LOCAL_DISABLED],
  };
}

async function getProxyStorage() {
  const values = (await browser.storage.local.get({
    [LOCAL_DISABLED]: false,
    [LOCAL_USER_PROXY_RULES]: [],
    [LOCAL_SYSTEM_PROXY]: DEFAULT_SYSTEM_PROXY,
  })) as {
    [LOCAL_DISABLED]: boolean;
    [LOCAL_USER_PROXY_RULES]: UserProxyRule[];
    [LOCAL_SYSTEM_PROXY]: SystemProxy;
  };

  return {
    isDisabled: values[LOCAL_DISABLED],
    userProxyRules: values[LOCAL_USER_PROXY_RULES].filter(({ enabled }) => enabled),
    systemProxy: values[LOCAL_SYSTEM_PROXY],
  };
}
