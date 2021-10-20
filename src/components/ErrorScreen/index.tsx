import { FC } from 'react';
import styles from './ErrorScreen.module.css';

const ErrorScreen: FC = ({ children = 'There was en error' }) => (
  <div className={styles.wrapper}>
    <div className={styles.box}>{children}</div>
  </div>
);

export default ErrorScreen;
