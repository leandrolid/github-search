import { ErrorInfo } from 'react';

export const errorLogger = (error: Error, errorInfo: ErrorInfo) => {
  console.warn(error.message);
  console.warn(errorInfo.componentStack);
};