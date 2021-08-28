import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName?: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>; // Receber um componente como propriedade
}

const InputForm: React.FC<InputProps> = ({
  name,
  labelName,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <>
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
      >
        {Icon && <Icon size={20} />}

        <input
          name={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </Container>
    </>
  );
};

export default InputForm;
