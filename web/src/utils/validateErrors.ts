import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function validateErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
      console.log(error.message);
    }
  });

  return validationErrors;
}
