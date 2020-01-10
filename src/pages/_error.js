import Layout from '../components/Layouts/Layout';

const ErrorPage = () => (
  <Layout title="Error">
    <h2>
      Cannot find what you are looking for
    </h2>
  </Layout>
);

ErrorPage.getInitialProps = () => ({
  namespacesRequired: [
    'error',
    'practitionerNavLink',
    'patientNavLink',
  ],
});

export default ErrorPage;
