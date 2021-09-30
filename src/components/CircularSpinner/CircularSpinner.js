import React from 'react';
import styles from './CircularSpinner.module.scss';
import PropTypes from 'prop-types';

export default function CircularSpinner({ className = '', isShowing = false }) {
  const renderSkChildren = () => {
    const items = [];

    for (let i = 0; i <= 11; i++) {
      let childElement = `child-${i}`;
      items.push(
        <div key={i} className={`${styles[childElement]} ${styles.skChild}`} />
      );
    }

    return items;
  };
  const items = renderSkChildren();
  return (
    isShowing && (
      <div data-testid="spinner" className={`${styles.loader} ${className}`}>
        {items}
      </div>
    )
  );
}

CircularSpinner.propTypes = {
  className: PropTypes.string,
  isShowing: PropTypes.bool,
};
