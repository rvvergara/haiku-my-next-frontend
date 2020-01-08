import Router from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../store/actions/alerts';
import { sendFeedback } from '../store/thunks/feedback';
import { setAuthorizationToken } from '../utils/api';

const FeedbackForm = ({ setAlert, currentUserData, sendFeedback }) => {
  const [body, setBody] = useState('');
  const [feedbackType, setFeedbackType] = useState('comment');

  const params = {
    authorId: currentUserData.id,
    feedbackType,
    body,
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setAuthorizationToken(localStorage.token);

    try {
      await sendFeedback(params);
      Router.push('/');
    } catch (error) {
      console.log(error);
    }

    setAlert('Feedback Submitted', 'success');
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <p>
        We would love to hear your thoughts, concerns or problem with anything
        so we can improve!
      </p>

      <form id="feedbackform" onSubmit={handleSubmit}>
        <input
          type="radio"
          name="feedbackType"
          value="comment"
          checked={feedbackType === 'comment'}
          onChange={e => setFeedbackType(e.target.value)}
        />
        Comments
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="bugReports"
          onChange={e => setFeedbackType(e.target.value)}
        />
        Bug Reports
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="questions"
          onChange={e => setFeedbackType(e.target.value)}
        />
        Questions
        <br />
        <h6>Describe Feedback:</h6>
        <textarea
          rows="4"
          cols="50"
          name="feedbackText"
          form="feedbackform"
          placeholder="Your feedback here"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { setAlert, sendFeedback })(
  FeedbackForm,
);
