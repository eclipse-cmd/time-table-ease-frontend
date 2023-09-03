import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

export const PrimaryButton = forwardRef<ButtonProps, 'button'>(({ ...rest }, ref) => {
  return (
    <Button
      display="flex"
      color="black"
      justifyContent="center"
      transition="ease-in-out"
      transitionDuration="300ms"
      alignItems="center"
      ref={ref}
      __css={{
        padding: '12px 16px',
        borderRadius: '5px',
        transition: '150ms ease-in-out',
      }}
      {...rest}
      className="bg-custom-gradient"
    />
  );
});
