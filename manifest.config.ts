import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const CHROME_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCflWz5yo5ccFut
fegaQJxuJHm8gIu1iV2E2FeaUzgVoECIMzSiukUm7sWX+I4hN6Vq8yHCtTX+4hup
03/F/UdbMFPOXBpPrMfsyxRdZPcSKl9VbhgK9u5F52IXvkwVInQF1NIMfTv9NFyc
G3hh7LVLlKnb1LYEohcfLXFhH+VaiFVUq92raSfphRiaBbRMwR+zkR+kBSH3Erll
WmyU8TZW5em83Cv7r4IMgGutc29zDAPJMKgWECgwCdEN8yACqXeAwqO1guS+m4xV
SWCNQOPn4PQ+CVp0lRNN70ivt+BSimcb996jtjM1QjmYNmnta/Gfo8i5Ur/WXER3
htBbOBhfAgMBAAECggEABX4K7bHwRvOdTUjgMyOtR77hWSVeTiflboLmf89f/X1o
5FBJIsN8bhYrsMrewWkPTozdpHMuKv6QWOM/TvhtVrVlPQFj7LgTxEi4cWy5cnXk
TcqMXreqYACtrJmGN/f+l7DJSn0I7fJwsGK+yuyTYn/UWVZmZMIkiLjhPRYUqEkY
79yFi9wRDSGUcz+VjNjYrtqG+GZppo74gkkbRIPjDeaz8QveFvMlqYiHoWRaWp0v
aQ41fJzWJJlOA0XKP4MGZgcCp+jW917bukZs3uUcH2xqMUhrGYcPKyec6uxjEtdC
b58AuzcUVQ/3JSfKmVrp6xDyDC6AKAcQNjL/hlCJ8QKBgQDgBV93EKlS5zbMbm11
WLvdczEgpzLE7bs80uPQ58js8jHeR4pZXVUdBO5QyIQbHUERv9MUo/xfPyJampqM
VbHUOpjn8hpBb91CXemcj55LUOfkkpBzoeMRVQ6192msq5tlwq2ag7RSQmX/DJ5/
AbK3PBx15S5CTvTlVa3gfQm31wKBgQC2XUFQGuYO4tghTeIO0GcEQF4JtpKKQpZK
knEttWSFcOQnHXZelK3Ti/vAfrFCY+Lf0T57LXTFdEx8h7NU1D0XfSFOR82dj2yH
F+4nr4ToEv8J/zIqfUuacFloELvGbRfyN/gzTYIylds/n2n2j9izVHcYyPUoAYR/
NK4lyr/yuQKBgBxIUV8k2VvAGSkCIAuaok05B9DJix1VrjfloCF1weY4RZd8jLjv
kZlSUAwe5J7PuLFW+H04ntofjGTH9A8XmpXit/9Aj5QHXXXNiXrcnu1/T2eKIXaX
z6UWif7rN4o3OC1GwMgrLI7eFyZ2H2SFgFyl2CoCPy7b7QsvH/6hiqKNAoGBAJfm
c6nCzhBmOXr8QajvRG/RIcNbdRJ/RmqVMnrNVg6kqxY9v0Qm+ed0+V0s6n+PbgHa
a/30Lgjux2sPKXwmUUDIdL6cppNwTQj2EOSzmbQpZpCwJdwog5n/rSk2jwJICqMy
paYuEJ4MHxUOtxeuV+WAHLfjY/lP0kqW2dwW1u3ZAoGBALRyf2RS/qYc7JP35TYg
J2BQAtwa1X9nJ4xjxrb4nVF2uQrZCWn7h93hzcsD9Gpqo/aKihngZ2maiQ2roMlO
NMWom47CH5oPrXOI18vnlZNuHWnLg9lm2qtMZAGI9QTfPmFKRGJNub4i+yvXAuJg
t5VAkkHVM+x2m0m19n0Xeb6U
-----END PRIVATE KEY-----
`;
const FIREFOX_UUID = '{57d21bc1-8434-5c3c-8cc8-69082edd16d9}';

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  key: CHROME_KEY,
  // @ts-ignore
  browser_specific_settings: {
    gecko: {
      id: FIREFOX_UUID,
      strict_min_version: '112.0',
      data_collection_permissions: {
        required: ['browsingActivity'],
      },
    },
  },
  icons: {
    16: 'public/icons/16.png',
    32: 'public/icons/32.png',
    48: 'public/icons/48.png',
    64: 'public/icons/64.png',
    128: 'public/icons/128.png',
    256: 'public/icons/256.png',
  },
  permissions: ['proxy', 'storage', 'management'],
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    scripts: ['src/sw.ts'],
    service_worker: 'src/sw.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/dark.ts'],
    },
  ],
});
