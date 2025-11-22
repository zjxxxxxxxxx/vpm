import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reorder } from 'framer-motion';
import { Plus } from 'lucide-react';
import { type UserProxyRule } from '@/common/types';
import { uuid } from '@/utils/uuid';
import { GlobalStoreHook } from '@/store/GlobalStore';
import { NeonGlow } from '@/components/NeonGlow';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { UserProxyForm } from './UserProxyForm';
import { UserProxyCard } from './UserProxyCard';

export const UserProxyList: React.FC = () => {
  const { t } = useTranslation();
  const [{ isDisabled: disabled, userProxyRules: values }, dispatch] = GlobalStoreHook.useState();
  const [isNewOpen, setNewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState<UserProxyRule>();
  const [hoverId, setHoverId] = useState<string>();
  const [dragId, setDragId] = useState<string>();

  function onChange(values: UserProxyRule[]) {
    dispatch({
      userProxyRules: values,
    });
  }

  return (
    <>
      <div className="px-4 pt-20 pb-22 h-full overflow-y-auto scrollbar-hidden">
        {values.length ? (
          <Reorder.Group axis="y" values={values} onReorder={(newOrder) => onChange(newOrder)}>
            {values.map((value) => {
              const isDisabled = !value.enabled || disabled;
              const isActive = value.id === hoverId || value.id === dragId;

              return (
                <Reorder.Item
                  className="relative"
                  key={value.id}
                  value={value}
                  onHoverStart={() => setHoverId(value.id)}
                  onHoverEnd={() => setHoverId(undefined)}
                  onDragStart={() => setDragId(value.id)}
                  onDragEnd={() => setDragId(undefined)}
                >
                  <UserProxyCard
                    value={value}
                    active={isActive}
                    disabled={isDisabled}
                    onEnable={() =>
                      onChange(
                        values.map((item) => ({
                          ...item,
                          enabled: item.id === value.id ? !item.enabled : item.enabled,
                        })),
                      )
                    }
                    onEdit={() => {
                      setEditOpen(true);
                      setFormData(value);
                    }}
                    onDelete={() => {
                      setDeleteOpen(true);
                      setFormData(value);
                    }}
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        ) : (
          <NeonGlow
            className="flex flex-col items-center justify-center mt-8 py-24 text-center rounded-2xl"
            dimmed={disabled}
          >
            <div className="text-6xl animate-pulse">🛰️</div>
            <div
              className={[
                'mt-4 text-base text-vpm-accent font-semibold tracking-wide transition-all duration-300',
                {
                  'text-vpm-disabled': disabled,
                },
              ]}
            >
              {t('You haven’t set up any proxy rules')}
            </div>
            <div
              className={[
                'flex items-center mt-2 text-xs text-vpm-primary transition-all duration-300',
                {
                  'text-vpm-disabled': disabled,
                },
              ]}
            >
              {t('Click bottom right')}
              <Plus
                className={[
                  'inline mx-0.5 text-vpm-input',
                  {
                    'text-vpm-disabled': disabled,
                  },
                ]}
                size={12}
              />
              {t('to add first rule')}
            </div>
          </NeonGlow>
        )}
      </div>
      <Button
        className={[
          'absolute bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-none',
          {
            'text-vpm-input border-0 from-vpm-primary2 to-vpm-accent2 brightness-125 contrast-125 hover:brightness-130 hover:contrast-130 hover:scale-110 focus:brightness-130 focus:contrast-130 focus:scale-110':
              !disabled,
            'text-vpm-disabled! border-vpm-disabled/60! from-vpm-overlay-from to-vpm-overlay-to':
              disabled,
          },
        ]}
        title={t('New Proxy Rule')}
        defaultHoverCSS={false}
        defaultFocusCSS={false}
        aria-haspopup="dialog"
        onClick={() => {
          setNewOpen(true);
          setFormData({
            id: uuid(),
            name: '',
            host: '',
            server: '',
            enabled: true,
          });
        }}
      >
        <Plus size={24} />
      </Button>
      {formData && (
        <>
          <UserProxyForm
            title={t('New Proxy Rule')}
            open={isNewOpen}
            value={formData}
            onClose={setNewOpen}
            onSubmit={(value) => onChange([value, ...values])}
          />
          <UserProxyForm
            title={t('Edit Proxy Rule')}
            open={isEditOpen}
            value={formData}
            onClose={setEditOpen}
            onSubmit={(value) =>
              onChange(values.map((item) => (item.id === value.id ? value : item)))
            }
          />
          <Dialog
            title={t('Are you sure you want to delete this rule?')}
            open={isDeleteOpen}
            onClose={setDeleteOpen}
            onConfirm={() => onChange(values.filter((item) => item.id !== formData.id))}
          >
            <span className="text-sm text-vpm-primary">{formData.name}</span>
          </Dialog>
        </>
      )}
    </>
  );
};
