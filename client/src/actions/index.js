import axios from 'axios';
import { FETCH_USER } from '../TYPES'

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleStripeToken = token => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    values.recipients = values.recipients.split(',').map(email => email.trim());
    const response = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: response.data });
};