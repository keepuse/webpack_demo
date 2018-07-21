import React, {Component} from 'react';
import reader from './reader.json';
import styles from './Greeter.css';

class Greeter extends Component{
  render() {
    return (
		<div className={styles.root}>
        {reader.greetText}
      </div>
    );
  }
}

export default Greeter