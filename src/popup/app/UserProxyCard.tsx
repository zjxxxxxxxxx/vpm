import { useTranslation } from 'react-i18next';
import { Pencil, Power, Trash2 } from 'lucide-react';
import { type UserProxyRule } from '@/common/types';
import { NeonGlow } from '@/components/NeonGlow';
import { Button } from '@/components/Button';

export type UserProxyCardProps = {
  value: UserProxyRule;
  active: boolean;
  disabled: boolean;
  onEnable(): void;
  onEdit(): void;
  onDelete(): void;
};

export const UserProxyCard: React.FC<UserProxyCardProps> = (props) => {
  const { value, active, disabled, onEnable, onDelete, onEdit } = props;
  const { t } = useTranslation();

  return (
    <NeonGlow
      className={[
        'relative my-6 p-6 rounded-2xl',
        {
          'pb-14': active,
        },
      ]}
      dimmed={disabled}
    >
      <div className="flex flex-col gap-2">
        <h2
          className={[
            'w-60 text-lg text-vpm-accent font-semibold line-clamp-1 transition-all duration-300',
            {
              'text-vpm-disabled': disabled,
            },
          ]}
          title={value.name}
        >
          {value.name}
        </h2>
        <div
          className={[
            'relative flex items-center gap-2 mt-1 text-xs text-vpm-primary overflow-hidden transition-all duration-300',
            {
              'text-vpm-disabled': disabled,
            },
          ]}
        >
          <span className="max-w-25 line-clamp-1" title={value.host}>
            {value.host}
          </span>
          <div
            className={[
              'relative flex-1 h-1 rounded-full overflow-hidden',
              {
                'bg-linear-to-r from-vpm-primary/20 via-vpm-accent/20 to-vpm-primary/20': !disabled,
                'bg-vpm-disabled/20': disabled,
              },
            ]}
          >
            <div
              className={[
                'absolute left-0 top-0 w-full h-1 bg-linear-to-r from-vpm-primary via-vpm-accent to-vpm-primary animate-slide-x',
                {
                  hidden: disabled,
                },
              ]}
            />
          </div>
          <span className="max-w-25 line-clamp-1" title={value.server}>
            {value.server}
          </span>
        </div>
      </div>
      <Button
        role="switch"
        className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full"
        title={t('Enable {{ruleName}}', {
          ruleName: value.name,
        })}
        dimmed={disabled}
        aria-checked={!disabled}
        onClick={onEnable}
      >
        <Power size={16} />
      </Button>
      <div
        className={[
          'absolute bottom-3 right-4 flex justify-end gap-3 opacity-0 transition-all duration-300',
          {
            'opacity-100': active,
          },
        ]}
      >
        <Button
          className={[
            'flex items-center justify-center p-2 w-8 h-8 text-vpm-primary rounded-full border-transparent bg-vpm-primary/20 shadow-vpm-primary/40 shadow-[0_0_10px]',
            'hover:border-vpm-primary/60 hover:bg-vpm-primary/40 hover:shadow-vpm-primary/60 hover:shadow-[0_0_20px] focus:border-vpm-primary/60 focus:bg-vpm-primary/40 focus:shadow-vpm-primary/60 focus:shadow-[0_0_20px]',
            {
              'text-vpm-disabled! bg-vpm-disabled/20! shadow-none! hover:border-vpm-disabled/20! focus:border-vpm-disabled/20!':
                disabled,
            },
          ]}
          title={t('Delete {{ruleName}}', {
            ruleName: value.name,
          })}
          defaultHoverCSS={false}
          defaultFocusCSS={false}
          aria-haspopup="dialog"
          onClick={onDelete}
        >
          <Trash2 size={16} />
        </Button>
        <Button
          className={[
            'flex items-center justify-center p-2 w-8 h-8 text-vpm-accent rounded-full border-transparent bg-vpm-accent/20 shadow-vpm-accent/40 shadow-[0_0_10px]',
            'hover:border-vpm-accent/60 hover:bg-vpm-accent/40 hover:shadow-vpm-accent/60 hover:shadow-[0_0_20px] focus:border-vpm-accent/60 focus:bg-vpm-accent/40 focus:shadow-vpm-accent/60 focus:shadow-[0_0_20px]',
            {
              'text-vpm-disabled! bg-vpm-disabled/20! shadow-none! hover:border-vpm-disabled/20! focus:border-vpm-disabled/20!':
                disabled,
            },
          ]}
          title={t('Edit {{ruleName}}', {
            ruleName: value.name,
          })}
          defaultHoverCSS={false}
          defaultFocusCSS={false}
          aria-haspopup="dialog"
          onClick={onEdit}
        >
          <Pencil size={16} />
        </Button>
      </div>
    </NeonGlow>
  );
};
