import { useTranslation } from 'react-i18next';
import { Power } from 'lucide-react';
import { GlobalStoreHook } from '@/store/GlobalStore';
import { Button } from '@/components/Button';

export const AppHeader = () => {
  const { t } = useTranslation();
  const [{ isDisabled }, dispatch] = GlobalStoreHook.useState();

  return (
    <div className="absolute top-0 left-0 z-100 flex items-center justify-between px-4 w-full h-16 bg-linear-to-br from-vpm-overlay-from/20 to-vpm-overlay-to/20 backdrop-blur-md">
      <h1
        className={[
          'w-20 transition-all duration-300',
          {
            'vpm-logo-disabled': isDisabled,
          },
        ]}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 384 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={t('VPM logo')}
        >
          <path
            d="M104 4H24C12.9543 4 4 12.9543 4 24V104C4 115.046 12.9543 124 24 124H104C115.046 124 124 115.046 124 104V24C124 12.9543 115.046 4 104 4Z"
            fill="url(#paint0)"
          />
          <path
            d="M104 4H24C12.9543 4 4 12.9543 4 24V104C4 115.046 12.9543 124 24 124H104C115.046 124 124 115.046 124 104V24C124 12.9543 115.046 4 104 4Z"
            stroke="url(#paint1)"
            strokeWidth="8"
          />
          <path
            d="M64 84C75.0457 84 84 75.0457 84 64C84 52.9543 75.0457 44 64 44C52.9543 44 44 52.9543 44 64C44 75.0457 52.9543 84 64 84Z"
            fill="url(#paint1)"
          />
          <path
            d="M184.002 99.0195L157 29H167.742L189.52 86.6172L211.346 29H222.039L195.037 99.0195H184.002Z"
            fill="url(#paint2)"
          />
          <path
            d="M234.002 99.0195V29H272.332C283.66 29 289.324 34.6803 289.324 46.041V56.002C289.324 67.3626 283.66 73.043 272.332 73.043H244.012V99.0195H234.002ZM244.012 63.0332H271.795C274.464 63.0332 276.385 62.4473 277.557 61.2754C278.729 60.1035 279.314 58.1829 279.314 55.5137V46.5293C279.314 43.86 278.729 41.9395 277.557 40.7676C276.385 39.5957 274.464 39.0098 271.795 39.0098H244.012V63.0332Z"
            fill="url(#paint2)"
          />
          <path
            d="M339.471 99.0195L313.348 47.7012V99.0195H303.338V29H314.275L340.936 81.7344L367.645 29H378.533V99.0195H368.572V47.7012L342.449 99.0195H339.471Z"
            fill="url(#paint2)"
          />
          <defs>
            <linearGradient
              id="paint0"
              x1="4"
              y1="4"
              x2="15364"
              y2="15364"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-vpm-overlay-from)" />
              <stop offset="1" stopColor="var(--color-vpm-overlay-to)" />
            </linearGradient>
            <linearGradient
              id="paint1"
              x1="0"
              y1="0"
              x2="128"
              y2="128"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--vpm-logo-1)" />
              <stop offset=".5" stopColor="var(--vpm-logo-2)" />
              <stop offset="1" stopColor="var(--vpm-logo-3)" />
            </linearGradient>
            <linearGradient
              id="paint2"
              x1="157"
              y1="29"
              x2="197.242"
              y2="156.32"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--vpm-logo-1)" />
              <stop offset=".5" stopColor="var(--vpm-logo-2)" />
              <stop offset="1" stopColor="var(--vpm-logo-3)" />
            </linearGradient>
          </defs>
        </svg>
      </h1>
      <Button
        role="switch"
        className="flex items-center justify-center h-10 w-10 rounded-full"
        title={t('Enable Proxy')}
        dimmed={isDisabled}
        aria-checked={!isDisabled}
        onClick={() =>
          dispatch({
            isDisabled: !isDisabled,
          })
        }
      >
        <Power size={18} />
      </Button>
    </div>
  );
};
