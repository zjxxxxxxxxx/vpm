import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const CHROME_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDppn1jC/wqrtUm
0gTfnpvK20+xWBjKyLCO/PUgD0eciy03DzTzwZ/flqk6BeIG0r4SgPfMyZyiIkG7
LJBhCCOkfmphV0S/hwRNE3MO3EhehSyH1ibfJP8wf5Zgs2poaXPElxs6/mMbXcOd
tES12D3kgfmNaqGN9fdhMpQj1JBBW5+nlzXf2ds2o+ymPEKFE4n1NI2oMt5y16sX
OsnXNnCLf3Ur7oV2qSYcYSSeFkQaUgJQHuw0LnuQzd2mVHXmwva6LoU1U9i2wIwS
5P+qSAhFywI4Nvy4acBZOZWuFvr4zYEIHsCIV+nPPJe8jR28D0foHXzLl+OXiWk1
M5l85+OtAgMBAAECggEAZmEN6xMK1PcTrfVzrjqVAD+1vTshbeWfO6BKllgrpEP1
tX0D0lVCxNmC4EpInn3ETF5XdlPXPtHs5GOkBehnmcHMwkdXd+bk8xL1JQtP6J7J
AuJK2RcgfHNDhK7JDuQ6FmexxllGOu0MdHNTcizE/fYXz6fsD0S6N0xOzh5rcT8q
pEwZyVwigAW9gonWAJdElgE9a1NubxEymI2Uu0zIqGjE4AdUXGbnuM+CMWJHPD6c
J8844UhwYQqwhhjASoR/jlaus39ZgEyA3m0QudEAR/IpfRsaRWyfG76mkPTB4sDe
vsC+cflN609oGv+KbJXJFDr1273DudOFdMx+av8C3wKBgQD6POwdKCoV5VlrQcVL
rXumrDllaXdFihfIz9FI2IxU6eTPhqtezoYRH4EVf9bh5udYJL2OtQAS+jqBaNlP
/3Po+/DlALGR5RSPwptaeeB6v+eiZjdH5YuGm36ifaRDvdSiab79YESbL59wVQiA
ZN31Qvt92F1Gs+CSGIysFDrPwwKBgQDvB8nUUKsq5STs0kllbPdZhfNUq8nAZ+rF
cANA+GAAB47gh3jOKaArAVku/B4nIbDrDlrkNRMfoVJcxcIWi6dhVorakr8NrJvY
DtqmqBd61Es1kixJG1GvOIBvcR8jFc8M868I69vOECVpdX2WBmIYCPSHq03ENh06
giRuef03zwKBgAeFoUtXE7zIwiFZPscBlf/ymV8VBoLOndxpcs8Pw1giF8CtOaWF
673EBqtQxnLP8BBUOmZ5xmDLqMqPDkk7Uo6kVB9uH+hUzINtxCG6HCdUcXAORocg
vUr0jZ/wyulGYYfoSddv91/61H4Z8EF7xrhCpTCpOlSPv6ZkmoXprcLlAoGBAN1S
rtTCJNtA9OG7DG63aIgh+V7q+ZIIJl/OCZU85VbhqK/JgFgUPtPTGcrhcuH01iWv
UwV/B0gATYzNJ5tMkB0Wztb3jaORsXNqvZYWijcXHtRplkvS2d2OSY3mhlgsN1zc
vbNbAFlapelx+mjRXD64/AIq4YTOPl4QZr9MgOQNAoGAVVnpW56hmTbRkSqqcn00
QTuwG72CnydZVIYKDIFYg4DGluYSsXYCkVWXuNA1uaSXj9meXm/q/1jbP7Gh5HfT
5KYJadINbiA4aEgSs9ojkZeDSCWkQ8DhB2T9EJtZojOBCXfAC6GuZW0NtN4ly270
rSMHtblDgYNF1tI6+21g07w=
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
    16: 'icons/16.png',
    32: 'icons/32.png',
    48: 'icons/48.png',
    64: 'icons/64.png',
    128: 'icons/128.png',
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
