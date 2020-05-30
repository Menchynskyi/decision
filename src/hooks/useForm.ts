import { useState } from 'react';

type Config<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
};

type ChangeHandler<T> = { [K in keyof T]: (text: string) => void };

export const useForm = <T>({ initialValues, onSubmit }: Config<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleSubmit = () => {
    if (Object.values(values).every((value) => value.trim())) {
      onSubmit(values);
    }
  };

  const handleChange = (fieldName: keyof T) => (text: string) => {
    setValues((prevState) => ({ ...prevState, [fieldName]: text }));
  };

  const createChangeHandlers = (val: T): ChangeHandler<T> => {
    return Object.keys(val).reduce(
      (acum, key) => ({ ...acum, [key]: handleChange(key as keyof T) }),
      {} as ChangeHandler<T>
    );
  };

  const changeHandlers = createChangeHandlers(values);

  const dirty = !Object.values(values).some((value) => !!value);

  return {
    values,
    handleSubmit,
    changeHandlers,
    dirty,
  };
};
