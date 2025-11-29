import { FieldLabel } from './FieldLabel';
import { NeonGlow } from './NeonGlow';

export type FieldInputProps = {
  label?: string;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?(value: string): void;
};

export const FieldInput: React.FC<FieldInputProps> = (props) => {
  const { label, autoFocus, required, placeholder, maxLength, value, onChange } = props;
  return (
    <FieldLabel label={label} required={required}>
      <NeonGlow
        as="input"
        className={[
          'mt-2 px-3 py-2 w-full text-xs text-vpm-input! placeholder:text-vpm-disabled rounded-lg outline-none',
          'focus:caret-vpm-accent focus:border-vpm-accent focus:shadow-vpm-accent/60',
        ]}
        type="text"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        aria-placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </FieldLabel>
  );
};
