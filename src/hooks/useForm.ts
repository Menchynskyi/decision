import { useState, useCallback, useMemo } from 'react';

type ValidationSchema<T> = { [K in keyof T]?: (value: T[keyof T]) => string };

type Config<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema?: ValidationSchema<T>;
};

type ChangeHandler<T> = { [K in keyof T]: (text: string) => void };

const createInitialErrorsState = <T>(initialValues: T): T => {
  return Object.keys(initialValues).reduce(
    (acum, key) => ({ ...acum, [key]: '' }),
    {} as T
  );
};

export const useForm = <T>({
  initialValues,
  onSubmit,
  validationSchema,
}: Config<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const initialErrors = useMemo(
    () => createInitialErrorsState(initialValues),
    []
  );
  const [errors, setErrors] = useState<T>(initialErrors);

  const handleSubmit = () => {
    let currentErrors = { ...errors };
    if (validationSchema) {
      Object.keys(validationSchema).map(key => {
        const validate = validationSchema[key as keyof T];
        if (validate) {
          const value = values[key as keyof T];
          const errorMessage = validate(value);
          setErrors(prev => ({ ...prev, [key]: errorMessage }));
          currentErrors = { ...currentErrors, [key]: errorMessage };
        }
      });
    }
    if (Object.values(currentErrors).every(error => !error)) {
      onSubmit(values);
      setValues(initialValues);
      setErrors(initialErrors);
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
    errors,
    handleSubmit,
    changeHandlers,
    dirty,
  };
};
