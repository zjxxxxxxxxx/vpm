import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useIds } from '@/hooks/useIds';
import { useInertRoot } from '@/hooks/useInertRoot';
import { NeonGlow } from './NeonGlow';
import { Button } from './Button';

export type DialogProps = React.PropsWithChildren<{
  title?: string;
  open?: boolean;
  confirmDisabled?: boolean;
  onConfirm?(): void;
  onClose?(open: boolean): void;
}>;

export const Dialog: React.FC<DialogProps> = (props) => {
  const { title = '', open = false, confirmDisabled, children, onConfirm, onClose } = props;
  const { t } = useTranslation();
  const [id, usbIds] = useIds('dialog', ['title']);

  useInertRoot(id, open);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div id={id} className="absolute inset-0 z-50 flex items-center justify-center p-0.5">
          <motion.div
            className="w-full h-full bg-linear-to-br from-vpm-overlay-from/20 to-vpm-overlay-to/20 backdrop-blur-md"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute w-92"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <NeonGlow
              className="relative p-6 w-full rounded-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby={usbIds.title}
            >
              <button
                className="absolute top-2 right-2 p-1 text-vpm-primary rounded-full cursor-pointer hover:text-vpm-accent"
                title={t('Close')}
                onClick={() => onClose?.(false)}
              >
                <XIcon size={20} />
              </button>
              <h2
                id={usbIds.title}
                className="mb-4 text-lg text-vpm-accent font-semibold tracking-wider"
              >
                {title}
              </h2>
              <div className="my-3">{children}</div>
              <div className="flex justify-end mt-6 gap-4">
                <Button
                  className="px-4 py-1.5 text-xs rounded-lg"
                  title={t('Cancel')}
                  onClick={() => onClose?.(false)}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  className={[
                    'px-4 py-1.5 text-xs rounded-lg',
                    {
                      'from-vpm-primary2/60 to-vpm-accent2/60': !confirmDisabled,
                    },
                  ]}
                  title={t('Confirm')}
                  disabled={confirmDisabled}
                  aria-disabled={confirmDisabled}
                  onClick={() => {
                    onConfirm?.();
                    onClose?.(false);
                  }}
                >
                  {t('Confirm')}
                </Button>
              </div>
            </NeonGlow>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('overlay')!,
  );
};
