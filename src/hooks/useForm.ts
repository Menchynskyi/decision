import { useState, useCallback, useMemo } from 'react';

type Config<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
};

type ChangeHandler<T> = { [K in keyof T]: (text: string) => void };

export const useForm = <T>({ initialValues, onSubmit }: Config<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleSubmit = () => {
    if (Object.values(values).every(value => value.trim())) {
      onSubmit(values);
      setValues(initialValues);
    }
  };

  const handleChange = useCallback(
    (fieldName: keyof T) => (text: string) => {
      setValues(prev => ({ ...prev, [fieldName]: text }));
    },
    []
  );

  const createChangeHandlers = useCallback((vals: T): ChangeHandler<T> => {
    return Object.keys(vals).reduce(
      (acum, key) => ({ ...acum, [key]: handleChange(key as keyof T) }),
      {} as ChangeHandler<T>
    );
  }, []);

  const changeHandlers = useMemo(() => createChangeHandlers(values), []);

  const dirty = !Object.values(values).some(value => !!value);

  return {
    values,
    handleSubmit,
    changeHandlers,
    dirty,
  };
};
