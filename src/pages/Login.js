import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionUserEmail } from '../redux/actions';
import WcLogo from '../images/wallet-logo.png';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { userEmail, history } = this.props;
    const { email } = this.state;
    userEmail(email);
    history.push('/carteira');
  };

  render() {
    const { password, email } = this.state;
    const validEmail = email.toLocaleLowerCase().match(/[a-z]+@[a-z]+.com/);
    const MIN_LENGTH = 6;
    return (
      <div className="container-login">
        <div className="container-inputs">
          <img src={ WcLogo } alt="wallet control logo" width={ 350 } />
          <input
            data-testid="email-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
            className="input-login"
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            minLength="6"
            placeholder="Senha"
            onChange={ this.handleChange }
            className="input-login"
          />
          <button
            data-testid="btn"
            type="button"
            disabled={ password.length < MIN_LENGTH || !validEmail }
            onClick={ this.handleClick }
            className="button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userEmail: (payload) => dispatch(actionUserEmail(payload)),
  };
}

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
