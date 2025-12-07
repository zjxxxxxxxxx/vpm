import { useEffect } from 'react';
import browser from 'webextension-polyfill';
import {
  LOCAL_SYSTEM_PROXY,
  LOCAL_DISABLED,
  LOCAL_USER_PROXY_RULES,
  DEFAULT_SYSTEM_PROXY,
} from '@/common/constants';
import { type SystemProxy, type UserProxyRule } from '@/common/types';
import { createStore } from '@/utils/store';
import { useAsyncEffect } from '@/hooks/useAsyncEffect';

export type GlobalStoreValue = {
  isLoading: boolean;
  isDisabled: boolean;
  userProxyRules: UserProxyRule[];
  systemProxy: SystemProxy;
};

const DEFAULT_GLOBAL_STORE_VALUE: GlobalStoreValue = {
  isLoading: true,
  isDisabled: false,
  userProxyRules: [],
  systemProxy: DEFAULT_SYSTEM_PROXY,
};

const [GlobalStoreProvider, GlobalStore] = createStore(
  DEFAULT_GLOBAL_STORE_VALUE,
  (initialValue) => {
    const [value, dispatch] = GlobalStore.useState();

    useAsyncEffect(async () => {
      const values = (await browser.storage.local.get({
        [LOCAL_DISABLED]: initialValue.isDisabled,
        [LOCAL_USER_PROXY_RULES]: initialValue.userProxyRules,
        [LOCAL_SYSTEM_PROXY]: initialValue.systemProxy,
      })) as {
        [LOCAL_DISABLED]: boolean;
        [LOCAL_USER_PROXY_RULES]: UserProxyRule[];
        [LOCAL_SYSTEM_PROXY]: SystemProxy;
      };
      dispatch({
        isLoading: false,
        isDisabled: values[LOCAL_DISABLED],
        userProxyRules: values[LOCAL_USER_PROXY_RULES],
        systemProxy: values[LOCAL_SYSTEM_PROXY],
      });
    }, []);

    useEffect(() => {
      if (!value.isLoading) {
        browser.storage.local.set({
          [LOCAL_DISABLED]: value.isDisabled,
        });
      }
    }, [value.isDisabled]);

    useEffect(() => {
      if (!value.isLoading) {
        browser.storage.local.set({
          [LOCAL_USER_PROXY_RULES]: value.userProxyRules,
        });
      }
    }, [value.userProxyRules]);

    useEffect(() => {
      if (!value.isLoading) {
        browser.storage.local.set({
          [LOCAL_SYSTEM_PROXY]: value.systemProxy,
        });
      }
    }, [value.systemProxy]);
  },
);

export { GlobalStoreProvider, GlobalStore };
