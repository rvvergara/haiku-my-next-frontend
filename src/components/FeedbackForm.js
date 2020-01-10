import Router from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../i18n';
import { setAlert } from '../store/actions/alerts';
import { sendFeedback } from '../store/thunks/feedback';
import { setAuthorizationToken } from '../utils/api';

const FeedbackForm = ({ setAlert, currentUserData, sendFeedback, t }) => {
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
    <div className="feedbackForm-container">
      <h1>{t('feedbackForm')}</h1>
      <p>{t('feedbackDesc')}</p>

      <form id="feedbackform" onSubmit={handleSubmit}>
        <input
          type="radio"
          name="feedbackType"
          value="comment"
          checked={feedbackType === 'comment'}
          onChange={e => setFeedbackType(e.target.value)}
        />
        {t('comment')}
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="bugReports"
          onChange={e => setFeedbackType(e.target.value)}
        />
        {t('bug')}
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="questions"
          onChange={e => setFeedbackType(e.target.value)}
        />
        {t('question')}

        <br />
        <h6>{t('feedbackTitle')} </h6>
        <textarea
          className="feedbackForm-textarea"
          rows="4"
          cols="50"
          name="feedbackText"
          form="feedbackform"
          placeholder={t('placeholder')}
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button className="feedbackForm-button" type="submit">
          {t('submit')}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { setAlert, sendFeedback })(
  withTranslation('feedbackForm')(FeedbackForm),
);
