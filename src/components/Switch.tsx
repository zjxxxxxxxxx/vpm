import { Button, type ButtonProps } from './Button';

export type SwitchProps = ButtonProps & {
  className?: string;
  checked?: boolean;
  onChange?(checked: boolean): void;
};

export const Switch: React.FC<SwitchProps> = (props) => {
  const { className, checked, onChange, ...ariaAttrs } = props;
  return (
    <Button
      role="switch"
      className={['relative w-12 h-6 rounded-full', className]}
      dimmed={!checked}
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      {...ariaAttrs}
    >
      <span
        className={[
          'absolute left-[3px] top-[3px] h-4 w-4 bg-vpm-input rounded-full transition-all duration-300 translate-x-0',
          {
            'translate-x-6': checked,
          },
        ]}
        aria-hidden="true"
      />
    </Button>
  );
};
