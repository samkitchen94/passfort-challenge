import PropTypes from "prop-types";

const Error = ({ msg }) => (
  <>
    <h3 style={{ color: 'red' }}>There has been an error:</h3>
    <p style={{ color: 'red' }}>{msg}</p>
  </>
);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
}

export default Error;