import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, wallet, exchangeRates } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          { userEmail }
        </p>
        <span data-testid="total-field">
          {wallet.reduce((total, element) => {
            const { currency, value } = element;
            const { ask } = exchangeRates[currency];
            const convert = Number(total) + (Number(ask) * value);
            const result = convert;
            return result;
          }, 0).toFixed(2)}
        </span>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    wallet: state.wallet.expenses,
    exchangeRates: state.wallet.data,
  };
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  wallet: PropTypes.arrayOf.isRequired,
  exchangeRates: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
