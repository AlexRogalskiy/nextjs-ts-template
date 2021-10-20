import {
  FC,
  createElement,
  ElementType,
  forwardRef,
  HTMLAttributes,
} from 'react';
import styles from './Card.module.css';

interface Props {
  as?: ElementType;
}

const CardText: FC<Props & HTMLAttributes<HTMLParagraphElement>> = forwardRef(
  ({ as = 'p', children, ...rest }, ref) =>
    createElement(
      as,
      {
        ...rest,
        ref,
        className: styles.text,
      },
      children,
    ),
);

CardText.displayName = 'CardText';

export default CardText;
