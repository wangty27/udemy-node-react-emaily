import React from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const FIELDS = [
  { label: 'Survey Title', name: 'title', placeholder: 'Title' },
  { label: 'Subject Line', name: 'subject', placeholder: 'Subject' },
  { label: 'Email Body', name: 'body', placeholder: 'Body' },
  { label: 'Recipient List', name: 'recipients', placeholder: 'Emails separated by a comma (E.g. abc@abc.com, def@def.com)' }
]

class SurveyNew extends React.Component {
  state = { showReview: false };

  render() {
    return (
      <div>
        {this.state.showReview ? 
          <SurveyFormReview
            FIELDS={FIELDS}
            onCancel={() => this.setState({ showReview: false })}
          />
          : 
          <SurveyForm
            FIELDS={FIELDS}
            onSubmit={() => this.setState({ showReview: true })}
          />
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);