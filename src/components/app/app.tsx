import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { ConstructorPage } from '@pages';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <ConstructorPage />
  </div>
);

export default App;
