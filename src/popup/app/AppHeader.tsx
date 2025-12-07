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
          viewBox="0 0 512 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={t('VPM logo')}
        >
          <path
            d="M104 4H24C12.954 4 4 12.954 4 24v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20V24c0-11.046-8.954-20-20-20z"
            fill="url(#l0)"
          />
          <path
            d="M104 4H24C12.954 4 4 12.954 4 24v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20V24c0-11.046-8.954-20-20-20z"
            stroke="url(#l1)"
            stroke-width="8"
          />
          <path
            d="M64 84c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"
            fill="url(#l1)"
          />
          <path
            d="M201.148 120L158 8h17.165l34.801 92.162L244.843 8h17.087l-43.149 112h-17.633zm79.898 0V8h61.249c18.102 0 27.153 9.086 27.153 27.258V51.19c0 18.172-9.051 27.258-27.153 27.258h-45.254V120h-15.995zm15.995-57.562h44.396c4.266 0 7.335-.938 9.208-2.812 1.873-1.874 2.808-4.946 2.808-9.216V36.04c0-4.271-.935-7.343-2.808-9.217-1.873-1.874-4.942-2.812-9.208-2.812h-44.396v38.427zM449.581 120l-41.743-82.087V120h-15.996V8h17.477l42.603 84.352L494.601 8H512v112h-15.917V37.913L454.34 120h-4.759z"
            fill="url(#l2)"
          />
          <defs>
            <linearGradient id="l0" x1="4" y1="4" x2="124" y2="124" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-vpm-overlay-from)" />
              <stop offset="1" stopColor="var(--color-vpm-overlay-to)" />
            </linearGradient>
            <linearGradient id="l1" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--vpm-logo-1)" />
              <stop offset=".5" stopColor="var(--vpm-logo-2)" />
              <stop offset="1" stopColor="var(--vpm-logo-3)" />
            </linearGradient>
            <linearGradient
              id="l2"
              x1="158"
              y1="8"
              x2="222.422"
              y2="211.618"
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
