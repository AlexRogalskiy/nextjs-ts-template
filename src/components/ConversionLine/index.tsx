import { FC } from 'react';
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';

interface Props {
  fromUnit: string;
  toUnit: string;
  value: number | string;
}

const ConversionLine: FC<Props> = ({ fromUnit, toUnit, value }) => (
  <Stat
    pointerEvents="none"
    sx={{
      dl: {
        display: 'flex',
        justifyContent: 'center',
      },
    }}
  >
    <StatLabel color="gray.400" marginRight={2}>
      1 {fromUnit}
    </StatLabel>
    <StatNumber fontSize="sm" color="gray.600">
      {value}{' '}
      <Text as="small" color="gray.400">
        {toUnit}
      </Text>
    </StatNumber>
  </Stat>
);

export default ConversionLine;
