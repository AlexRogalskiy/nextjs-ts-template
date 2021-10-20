import { FC, forwardRef, createElement, ElementType } from 'react';
import ColorHash from 'color-hash';
import styles from './Card.module.css';

interface Props {
  as?: ElementType;
  children: string;
}

const dotColorHash = new ColorHash({ lightness: 0.4, saturation: 1 });
const textColorHash = new ColorHash({ lightness: 0.35, saturation: 0.35 });

const CardTitleDecoration: FC<Pick<Props, 'children'>> = ({ children }) => (
  <span
    className={styles.dot}
    style={{ backgroundColor: dotColorHash.hex(children) }}
  />
);

const CardTitle: FC<Props> = forwardRef(
  ({ as = 'h3', children, ...rest }, ref) => {
    const decoration = <CardTitleDecoration>{children}</CardTitleDecoration>;
    const content = (
      <>
        {decoration}
        {children}
        {decoration}
      </>
    );
    return createElement(
      as,
      {
        ...rest,
        ref,
        className: styles.title,
        style: {
          color: textColorHash.hex(children),
        },
      },
      content,
    );
  },
);

CardTitle.displayName = 'CardTitle';

export default CardTitle;
