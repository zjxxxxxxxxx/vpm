import { useCallback, useState } from 'react';

export function useFormState<T extends object>(value: T) {
  const [formData, setFormData] = useState(value);
  const updateFormData = useCallback((action: Partial<T>) => {
    setFormData((value) => ({
      ...value,
      ...action,
    }));
  }, []);
  return [formData, updateFormData] as const;
}
