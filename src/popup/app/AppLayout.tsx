import { GlobalStore } from '@/store/GlobalStore';

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, isDisabled } = GlobalStore.useValue();
  return (
    <div
      className={[
        'relative p-0.5 w-100 h-150 overflow-hidden transition-all duration-300',
        {
          hidden: isLoading,
          'p-px': isDisabled,
        },
      ]}
    >
      <div
        className={[
          'absolute top-0 left-0 -mt-20 -ml-45 w-190 h-190 bg-linear-to-br transition-all duration-300',
          {
            'from-vpm-primary2 to-vpm-accent2 animate-spin-slow': !isDisabled,
            'from-vpm-disabled/40 to-vpm-disabled/40': isDisabled,
          },
        ]}
      ></div>
      <div className="relative z-10 w-full h-full bg-linear-to-br from-vpm-overlay-from to-vpm-overlay-to">
        {children}
      </div>
    </div>
  );
};
