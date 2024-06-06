import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleClickRemove = (expense) => {
    const { removeExpenses } = this.props;
    console.log(expense);
    removeExpenses(expense);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const {
                description,
                value,
                exchangeRates,
                currency,
                tag,
                method,
                id,
              } = expense;
              const exchangeValue = Number(exchangeRates[currency].ask);
              const currencyName = (exchangeValue * value);
              const conversion = exchangeValue * value;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeValue.toFixed(2)}</td>
                  <td>{conversion.toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClickRemove(expense) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeExpenses: (expense) => dispatch(removeExpense(expense)),
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
