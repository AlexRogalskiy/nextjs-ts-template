import { FC, createElement, ElementType } from 'react';
import styles from './SimpleGrid.module.css';

interface Props {
  itemWidth?: string;
  gap?: string;
  as?: ElementType;
}

const SimpleGrid: FC<Props> = ({
  itemWidth = '240px',
  gap = '16px',
  as = 'ul',
  children,
}) =>
  createElement(
    as,
    {
      className: styles.main,
      style: {
        gap,
        gridTemplateColumns: `repeat(auto-fill,minmax(${itemWidth}, 1fr))`,
      },
    },
    children,
  );

SimpleGrid.displayName = 'SimpleGrid';

export default SimpleGrid;
