export const actionUserEmail = (payload) => ({ type: 'USER_EMAIL', payload });
export const actionExpense = (payload) => ({ type: 'ADD_EXPENSE', payload });
export const actionData = (payload) => ({ type: 'DATA', payload });
export const removeExpense = (payload) => ({ type: 'REMOVE_EXPENSE', payload });

export function fetchCoinAPI() {
  return async (dispatch) => {
    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const key = 'USDT';
    delete data[key];
    const currencies = Object.keys(data).map((element) => element);
    dispatch({ type: 'REQUEST_CURRENCIES', currencies });
  };
}
