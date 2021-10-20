import { FC, createElement, ElementType, forwardRef } from 'react';
import styles from './Card.module.css';

interface Props {
  as?: ElementType;
}

const Card: FC<Props> = forwardRef(({ as = 'a', children, ...rest }, ref) =>
  createElement(
    as,
    {
      ...rest,
      ref,
      className: styles.main,
    },
    children,
  ),
);

Card.displayName = 'Card';

export default Card;
