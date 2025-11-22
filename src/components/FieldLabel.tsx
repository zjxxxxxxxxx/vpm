export type FieldLabelProps = React.PropsWithChildren<{
  className?: string;
  label?: string;
  required?: boolean;
}>;

export const FieldLabel: React.FC<FieldLabelProps> = (props) => {
  const { className, label, required, children } = props;
  return (
    <label className={['flex flex-col my-3', className]}>
      <span className="text-sm text-vpm-primary font-medium">
        {required ? '* ' : ''}
        {label}
      </span>
      {children}
    </label>
  );
};
