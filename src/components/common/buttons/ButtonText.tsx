import { forwardRef, Text, TextProps } from '@chakra-ui/react';

export const ButtonText = forwardRef<TextProps, 'span'>((props, ref) => {
  const { fontWeight, ...rest } = props;

  return <Text as="span" ref={ref} color="inherit" style={{ fontWeight: (fontWeight as string) || 600 }} {...rest} />;
});
