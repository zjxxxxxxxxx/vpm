import { NeonGlow } from './NeonGlow';

export type ButtonProps = React.AriaAttributes &
  React.PropsWithChildren<{
    role?: React.AriaRole;
    className?: string;
    defaultHoverCSS?: boolean;
    defaultFocusCSS?: boolean;
    title?: string;
    dimmed?: boolean;
    disabled?: boolean;
    onClick?(): void;
  }>;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    defaultHoverCSS = true,
    defaultFocusCSS = true,
    title,
    dimmed,
    disabled,
    children,
    onClick,
    ...ariaAttrs
  } = props;
  return (
    <NeonGlow
      as="button"
      className={[
        'cursor-pointer',
        {
          'focus:text-vpm-accent focus:border-vpm-accent focus:shadow-vpm-accent/60':
            defaultFocusCSS && !dimmed && !disabled,
          'cursor-not-allowed': disabled,
        },
        className,
      ]}
      defaultHoverCSS={defaultHoverCSS}
      title={title}
      dimmed={dimmed || disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...ariaAttrs}
    >
      {children}
    </NeonGlow>
  );
};
