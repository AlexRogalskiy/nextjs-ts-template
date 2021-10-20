import { FC } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import colorHashers from '@/modules/colorHashers';
import { ConversionsHistory } from './useFetchConversionsHistory';

interface Props {
  data: ConversionsHistory;
  reset: () => void;
}

const HistoryTable: FC<Props> = ({ data, reset }) => (
  <Table bgColor="white" variant="simple" marginBottom={8}>
    <Thead>
      <Tr>
        <Th textAlign="center">Currency</Th>
        {data.dates.map((date) => (
          <Th textAlign="right" key={date}>
            {new Date(date).toLocaleDateString()}
          </Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {data.conversions.map((conversion) => (
        <Tr color={colorHashers.text.hex(conversion.key)} key={conversion.key}>
          <Td textAlign="center">{conversion.key}</Td>
          {conversion.values.map((value) => (
            <Td key={value} textAlign="right">
              {value}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default HistoryTable;
