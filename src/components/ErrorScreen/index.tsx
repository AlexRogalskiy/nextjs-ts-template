import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import ScreenWrapper from '../ScreenWrapper';

const ErrorScreen: FC = ({ children = 'There was en error' }) => (
  <ScreenWrapper
    backgroundColor="#c55c49"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      padding="24px"
      bgColor="white"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      borderRadius="4px"
    >
      {children}
    </Box>
  </ScreenWrapper>
);

export default ErrorScreen;
