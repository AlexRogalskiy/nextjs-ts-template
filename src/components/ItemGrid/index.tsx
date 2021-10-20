import { FC } from 'react';
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

const ItemGrid: FC<SimpleGridProps> = (props) => (
  <SimpleGrid
    as="ul"
    minChildWidth="240px"
    spacing={4}
    listStyleType="none"
    {...props}
  />
);

export default ItemGrid;
