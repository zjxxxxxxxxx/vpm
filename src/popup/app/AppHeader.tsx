import { useTranslation } from 'react-i18next';
import { Power } from 'lucide-react';
import { GlobalStore } from '@/store/GlobalStore';
import { Button } from '@/components/Button';

export const AppHeader: React.FC = () => {
  const { t } = useTranslation();
  const [{ isDisabled }, dispatch] = GlobalStore.useState();

  return (
    <div className="absolute top-0 left-0 z-100 flex items-center justify-between px-4 w-full h-16 bg-linear-to-br from-vpm-overlay-from/20 to-vpm-overlay-to/20 backdrop-blur-md">
      <h1
        className={[
          'w-21 transition-all duration-300',
          {
            'vpm-logo-disabled': isDisabled,
          },
        ]}
      >
        <svg
          role="img"
          width="100%"
          height="100%"
          viewBox="0 0 448 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={t('VPM logo')}
        >
          <path
            d="M104 4H24C12.954 4 4 12.954 4 24v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20V24c0-11.046-8.954-20-20-20z"
            fill="url(#l1)"
          />
          <path
            d="M104 4H24C12.954 4 4 12.954 4 24v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20V24c0-11.046-8.954-20-20-20z"
            stroke="url(#l2)"
            stroke-width="8"
          />
          <path
            d="M64 84c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"
            fill="url(#l2)"
          />
          <path
            d="M187.25 111L151 17h14.421l29.237 77.35L223.959 17h14.355l-36.25 94H187.25zM254.374 111V17h51.457c15.208 0 22.812 7.626 22.812 22.877V53.25c0 15.251-7.604 22.877-22.812 22.877h-38.019V111h-13.438zm13.438-48.311h37.298c3.584 0 6.162-.787 7.736-2.36 1.573-1.573 2.359-4.151 2.359-7.735V40.533c0-3.584-.786-6.162-2.359-7.735-1.574-1.573-4.152-2.36-7.736-2.36h-37.298v32.251zM395.964 111l-35.069-68.894V111h-13.439V17h14.683l35.792 70.795L433.787 17h14.617v94h-13.372V42.106L399.962 111h-3.998z"
            fill="url(#l3)"
          />
          <defs>
            <linearGradient id="l1" x1="4" y1="4" x2="124" y2="124" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-vpm-overlay-from)" />
              <stop offset="1" stopColor="var(--color-vpm-overlay-to)" />
            </linearGradient>
            <linearGradient id="l2" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--vpm-logo-1)" />
              <stop offset=".5" stopColor="var(--vpm-logo-2)" />
              <stop offset="1" stopColor="var(--vpm-logo-3)" />
            </linearGradient>
            <linearGradient
              id="l3"
              x1="151"
              y1="17"
              x2="205.024"
              y2="187.925"
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
        onClick={() => {
          dispatch({
            isDisabled: !isDisabled,
          });
        }}
      >
        <Power size={18} />
      </Button>
    </div>
  );
};
