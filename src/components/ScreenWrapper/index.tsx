import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const ScreenWrapper: FC<BoxProps> = (props) => (
  <Box
    bgColor="gray.100"
    {...props}
    minHeight="100vh"
    padding="24px"
    transition="background-color 1s"
  />
);

export default ScreenWrapper;
