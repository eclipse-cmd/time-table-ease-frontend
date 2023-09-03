import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

export const DefaultButton = forwardRef<ButtonProps, 'button'>(({ className, ...rest }, ref) => {
  return (
    <Button
      display="flex"
      ref={ref}
      {...rest}
      className={`flex justify-center rounded-md px-4 border-[0.5px] border-stroke bg-meta-4 text-white hover:text-primary dark:border-strokedark dark:bg-gray dark:text-black ${className}`}
    />
  );
});
