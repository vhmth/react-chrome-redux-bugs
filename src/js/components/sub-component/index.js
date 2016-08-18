import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import './styles.less';

class SubComponent extends Component {
  render() {
    const { count } = this.props;
    return (
      <div className="rcrb-sub-component">
        <p>Count: { count }</p>
        <input type="button"
               value="increment"
               onClick={ this.props.incrementCounter } />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  // I'm expecting `counter` to not be `null` at this point since
  // `renderSubComponent` should be `false` whenever `counter` is `null`,
  // making it so this should never be called.
  const { counter } = state;
  const { count } = counter;
  return { count };
};
const mapDispatchToProps = (dispatch) => {
  return {
    incrementCounter: () => dispatch({ type: 'increment-counter' })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubComponent);
