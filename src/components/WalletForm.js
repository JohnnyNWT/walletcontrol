import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionExpense, actionData, fetchCoinAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
    exchangeRates: [],
  };

  async componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { addExpense, getData } = this.props;
    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    getData(data);
    this.setState({
      exchangeRates: data,
    }, () => {
      addExpense(this.state);
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      }));
    });
  };

  render() {
    const CATEGORY = ['Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const PAYMENT = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="selectCoin">
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies?.map((currencie, key) => (
              <option key={ key } value={ currencie }>{ currencie }</option>
            ))}
            ;
          </select>
        </label>

        <label htmlFor="payment">
          Método de pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {PAYMENT.map((payment, key) => (
              <option key={ key } value={ payment }>{ payment }</option>
            ))}
            ;
          </select>
        </label>

        <label htmlFor="category">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            {CATEGORY.map((category, key) => (
              <option key={ key } value={ category }>{ category }</option>
            ))}
            ;
          </select>
        </label>
        <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addExpense: (payload) => dispatch(actionExpense(payload)),
    getData: (payload) => dispatch(actionData(payload)),
    currenciesDispatch: () => dispatch(fetchCoinAPI()),
  };
}

WalletForm.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
