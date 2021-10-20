import { FC } from 'react';
import Link from 'next/link';
import { Card, CardTitle, CardText } from '@/components/Card';

interface Props {
  code: string;
  name: string;
}

const HomeItem: FC<Props> = ({ code, name }) => (
  <li>
    <Link href={`/detail/${code}`} passHref>
      <Card>
        <CardTitle as="h2">{code}</CardTitle>
        <CardText>{name}</CardText>
      </Card>
    </Link>
  </li>
);

export default HomeItem;
