import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: string;
  multiple?: boolean;
}

const FileUploadInput = React.forwardRef<HTMLInputElement, Props>(
  ({ accept, multiple, className, ...rest }, ref) => {
    const inputClassName = `sr-only ${className ?? ''}`.trim();
    return (
      <input
        ref={ref}
        type="file"
        accept={accept}
        {...(multiple ? { multiple: true } : {})}
        {...rest}
        className={inputClassName}
      />
    );
  }
);

FileUploadInput.displayName = 'FileUploadInput';

export default FileUploadInput;
