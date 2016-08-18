import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import SubComponent from '../sub-component';

import './styles.less';

class ContentApp extends Component {
  render() {
    const { renderSubComponent } = this.props;
    let subComponent;
    if (renderSubComponent) {
      subComponent = <SubComponent />;
    }
    return (
      <div className="rcrb-content-app">
        <p>This is the content app - should always show.</p>
        { subComponent }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { renderSubComponent } = state;
  return { renderSubComponent };
};
export default connect(mapStateToProps, null)(ContentApp);
