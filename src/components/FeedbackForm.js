import { useState } from 'react';
import { setAlert } from '../store/actions/alerts';
import { connect } from 'react-redux';

const FeedbackForm = ({setAlert}) => {
  const [formData, setFormData] = useState({
    feedbackText: '',
    feedbackType: 'comments',
  });

  const { feedbackText } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
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
          value="comments"
          onChange={e => handleChange(e)}
        />
        Comments
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="bugReports"
          onChange={e => handleChange(e)}
        />
        Bug Reports
        <br />
        <input
          type="radio"
          name="feedbackType"
          value="questions"
          onChange={e => handleChange(e)}
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
          value={feedbackText}
          onChange={e => handleChange(e)}
        />
        <br />
        <br />
        First name:
        <br />
        <input type="text" name="firstname" />
        <br />
        Last name:
        <br />
        <input type="text" name="lastname" />
        <br />
        <br />
        Email:
        <br />
        <input type="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default connect(null,{setAlert})(FeedbackForm);
