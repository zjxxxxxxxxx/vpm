import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';
import { GlobalStoreHook } from '@/store/GlobalStore';
import { useFormState } from '@/hooks/useFormState';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { Switch } from '@/components/Switch';
import { FieldInput } from '@/components/FieldInput';
import { FieldLabel } from '@/components/FieldLabel';

export const SystemProxy: React.FC = () => {
  const { t } = useTranslation();
  const [{ isDisabled, systemProxy }, dispatch] = GlobalStoreHook.useState();
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useFormState(systemProxy);

  return (
    <>
      <Button
        className="absolute bottom-7 left-5 z-50 flex items-center gap-1 px-3 h-10 rounded-xl"
        title={t('System Proxy')}
        dimmed={isDisabled}
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          setFormData(systemProxy);
        }}
      >
        <Settings size={16} />
        <span className="text-xs font-medium">{t('System Proxy')}</span>
      </Button>
      <Dialog
        title={t('System Proxy')}
        open={isOpen}
        confirmDisabled={!formData.target}
        onClose={setOpen}
        onConfirm={() =>
          dispatch({
            systemProxy: formData,
          })
        }
      >
        <FieldInput
          label={t('Proxy Address')}
          required
          autoFocus
          placeholder={t('Example: 127.0.0.1:1080')}
          maxLength={20}
          value={formData.target}
          onChange={(target) =>
            setFormData({
              target,
            })
          }
        />
        <FieldLabel className="flex-row items-center justify-between" label={t('Enable Proxy')}>
          <Switch
            checked={formData.enabled}
            title={t('Enable Proxy')}
            onChange={(enabled) =>
              setFormData({
                enabled,
              })
            }
          />
        </FieldLabel>
      </Dialog>
    </>
  );
};
