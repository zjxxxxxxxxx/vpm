import { type SystemProxy, type UserProxyRule } from '@/common/types';

const PROXY_RULES_MARK = '__PROXY_RULES__';
const SYSTEM_PROXY_MARK = '__SYSTEM_PROXY__';
const PAC_SCRIPT_TEMPLATE = `
const PROXY_RULES = ${PROXY_RULES_MARK};
const DEFAULT_PROXY = '${SYSTEM_PROXY_MARK}DIRECT';
const URL_RE = /^(?:[a-zA-Z][a-zA-Z\\d+\\-.]*:)?\\/\\/([^/?#:]+?)(?::(\\d+))?(?:[/?#:]|$)/;
function FindProxyForURL(url) {
  const [, host, port = ''] = url.match(URL_RE);
  for (const { host: ruleHost, port: rulePort, server, isWildcard } of PROXY_RULES) {
    const matched = isWildcard
      ? shExpMatch(host, ruleHost)
      : (host === ruleHost || dnsDomainIs(host, '.' + ruleHost));
    if (matched && port === rulePort) {
      return 'PROXY ' + server;
    }
  }
  return DEFAULT_PROXY;
}
`;

export function generatePacScript(rules: UserProxyRule[], system: SystemProxy) {
  const pacScript = PAC_SCRIPT_TEMPLATE.replace(
    PROXY_RULES_MARK,
    JSON.stringify(preprocessRules(rules)),
  ).replace(SYSTEM_PROXY_MARK, system.enabled ? `PROXY ${system.target};` : '');

  if (__BROWSER__ === 'firefox') {
    const bytes = new TextEncoder().encode(pacScript);
    const base64 = btoa(String.fromCharCode(...bytes));
    return {
      proxyType: 'autoConfig',
      autoConfigUrl: `data:application/x-ns-proxy-autoconfig;base64,${base64}`,
    };
  }

  return {
    mode: 'pac_script',
    pacScript: {
      data: pacScript,
    },
  };
}

function preprocessRules(rules: UserProxyRule[]) {
  return rules.map((rule) => {
    const [host, port = ''] = rule.host.split(':', 2);
    const isWildcard = host.includes('*') || host.includes('?');

    return {
      host,
      port,
      server: rule.server,
      isWildcard,
    };
  });
}
