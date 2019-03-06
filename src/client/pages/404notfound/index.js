import React from 'react';
import styles from './index.less';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.NotFound}>
        <div className={styles.image} />
        <span>404, not found ...</span>
      </div>
    );
  }
}

export default Error;
