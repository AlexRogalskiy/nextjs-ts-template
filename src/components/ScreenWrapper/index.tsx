import { FC } from 'react';
import styles from './ScreenWrapper.module.css';

interface Props {
  bg?: string;
}

const ScreenWrapper: FC<Props> = ({ children, bg = '#eee' }) => (
  <div
    className={styles.main}
    style={{
      backgroundColor: bg,
    }}
  >
    {children}
  </div>
);

export default ScreenWrapper;
