import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type UserProxyRule } from '@/common/types';
import { useFormState } from '@/hooks/useFormState';
import { Dialog } from '@/components/Dialog';
import { Switch } from '@/components/Switch';
import { FieldInput } from '@/components/FieldInput';
import { FieldLabel } from '@/components/FieldLabel';

export type UserProxyFormProps = {
  title: string;
  open: boolean;
  value: UserProxyRule;
  onSubmit(value: UserProxyRule): void;
  onClose(value: boolean): void;
};

export const UserProxyForm: React.FC<UserProxyFormProps> = (props) => {
  const { title, open, value, onSubmit, onClose } = props;
  const { t } = useTranslation();
  const [formData, setFormData] = useFormState(value);
  const isDisabled = useMemo(
    () => !formData.name || !formData.host || !formData.server,
    [formData],
  );

  useEffect(() => setFormData(value), [open]);

  return (
    <Dialog
      title={title}
      open={open}
      confirmDisabled={isDisabled}
      onClose={onClose}
      onConfirm={() => onSubmit(formData)}
    >
      <FieldInput
        label={t('Rule Name')}
        required
        autoFocus
        placeholder={t('Example: My Proxy')}
        maxLength={50}
        value={formData.name}
        onChange={(name) =>
          setFormData({
            name,
          })
        }
      />
      <FieldInput
        label={t('Target Host')}
        required
        placeholder={t('Example: dev.com')}
        maxLength={50}
        value={formData.host}
        onChange={(host) =>
          setFormData({
            host,
          })
        }
      />
      <FieldInput
        label={t('Proxy Server')}
        required
        placeholder={t('Example: 127.0.0.1:1080')}
        maxLength={50}
        value={formData.server}
        onChange={(server) =>
          setFormData({
            server,
          })
        }
      />
      <FieldLabel className="flex-row items-center justify-between" label={t('Enable Rule')}>
        <Switch
          checked={formData.enabled}
          title={t('Enable Rule')}
          onChange={(enabled) =>
            setFormData({
              enabled,
            })
          }
        />
      </FieldLabel>
    </Dialog>
  );
};
