import { AsTag, type Tags, type AsTagProps } from './AsTag';

export type NeonGlowProps<Tag extends Tags> = AsTagProps<Tag> & {
  defaultHoverCSS?: boolean;
  title?: string;
  dimmed?: boolean;
};

export function NeonGlow<Tag extends Tags>(props: NeonGlowProps<Tag>) {
  const { className, defaultHoverCSS = true, title, dimmed, children, ...asProps } = props;
  return (
    <AsTag
      className={[
        'text-vpm-primary border border-vpm-primary shadow-vpm-primary/60 shadow-[0_0_15px] bg-linear-to-br from-vpm-overlay-from/60 to-vpm-overlay-to/60 transition-all duration-300 backdrop-blur-md',
        {
          'hover:text-vpm-accent hover:border-vpm-accent hover:shadow-vpm-accent/60 hover:breath-shadow-cyan hover:animate-breath-shadow hover:animate-delay-300':
            defaultHoverCSS && !dimmed,
          'text-vpm-disabled border-vpm-disabled/40 shadow-[0_0_0px]': dimmed,
        },
        className,
      ]}
      title={title}
      aria-label={title}
      {...asProps}
    >
      {children}
    </AsTag>
  );
}
