import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(props => {
  const reviewFields = props.FIELDS.map(field => {
    return (
      <div key={field.name}>
        <label style={{fontSize: '15px'}}>{field.label}</label>
        <input disabled value={props.formValues[field.name]} className="mb-3 text-dark" />
      </div>
    );
  });

  return (
    <div>
      <h3 className="text-center m-3">Please confirm your entries</h3>
      {reviewFields}
      <button className="yellow darken-3 btn-flat white-text mt-3" onClick={props.onCancel}>
        <i className="material-icons left">chevron_left</i>
        Back
      </button>
      <button className="teal btn-flat right white-text mt-3" onClick={() => props.submitSurvey(props.formValues, props.history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}));