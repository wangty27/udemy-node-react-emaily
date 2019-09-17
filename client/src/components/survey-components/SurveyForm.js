import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

var FIELDS = [];

class SurveyForm extends React.Component {
  componentDidMount() {
    FIELDS = this.props.FIELDS;
  }

  renderFields() {
    return (
      <React.Fragment>
        {this.props.FIELDS.map(props => (
          <Field 
            type="text"
            name={props.name}
            component={SurveyField}
            label={props.label}
            key={props.name}
            placeholder={props.placeholder}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <form className="mt-3" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}
          <Link to="/Surveys" className="red btn-flat white-text mt-3" style={{textDecoration: 'none'}} >
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text mt-3">
            Next
            <i className="material-icons right">chevron_right</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);