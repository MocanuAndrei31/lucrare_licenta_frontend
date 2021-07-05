import axios from 'axios';

import { fetchProducts } from './productsActions';

export const addToCart = (product) => (dispatch, getState) => {
  let itemsPrice = 0;
  getState().products.cartItems
    ? (itemsPrice = getState().products.itemsPrice)
    : (itemsPrice = JSON.parse(localStorage.getItem('cartPrice')));

  let products;
  getState().products.cartItems
    ? (products = getState().products.cartItems)
    : (products = JSON.parse(localStorage.getItem('cartItems')));

  let items;
  if (products === null) {
    items = [];
  } else {
    items = products;
  }
  // console.log("itemsPrice",itemsPrice)
  let sumItemsPrice = itemsPrice * 1;

  let cartItems = items.slice();
  let productAlreadyInCart = false;

  cartItems.forEach((item) => {
    if (item.ID === product.ID) {
      item.count++;
      sumItemsPrice += parseFloat(product.price);
      productAlreadyInCart = true;
    }
  });

  if (!productAlreadyInCart) {
    cartItems.push({ ...product, count: 1 });
    sumItemsPrice += parseFloat(product.price);
  }

  let sumItems = sumItemsPrice;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartPrice', JSON.stringify(sumItems));

  dispatch({
    type: 'CART_ITEMS',
    payload: cartItems,
  });

  dispatch({
    type: 'CART_ITEMS_PRICE',
    payload: sumItems,
  });
};

export const deleteItem = (index) => (dispatch, getState) => {
  let products;
  getState().products.cartItems
    ? (products = getState().products.cartItems)
    : (products = JSON.parse(localStorage.getItem('cartItems')));

  let price;
  getState().products.cartItems
    ? (price = parseFloat(getState().products.cartItems[index].price))
    : (price = parseFloat(JSON.parse(localStorage.getItem('cartItems'))[index].price));

  let multiple;
  getState().products.cartItems
    ? (multiple = getState().products.cartItems[index].count)
    : (multiple = JSON.parse(localStorage.getItem('cartItems'))[index].count);

  let total;
  getState().products.itemsPrice
    ? (total = parseFloat(getState().products.itemsPrice))
    : (total = parseFloat(JSON.parse(localStorage.getItem('cartPrice'))));

  const calcTotal = ((total * 100 - price * 100 * multiple) / 100);
  const filter = products.filter((list, i) => i !== index);

  localStorage.setItem('cartItems', JSON.stringify(filter));
  localStorage.setItem('cartPrice', JSON.stringify(calcTotal));

  dispatch({
    type: 'CART_ITEMS',
    payload: filter,
  });

  dispatch({
    type: 'CART_ITEMS_PRICE',
    payload: calcTotal,
  });
};

export const deleteAll = () => (dispatch) => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartPrice');

  dispatch({
    type: 'CART_ITEMS',
    // payload: undefined,
    // payload: null,
  });

  dispatch({
    type: 'CART_ITEMS_PRICE',
    // payload: undefined,
    // payload: null,
  });
};

export const incrementNr = (index) => (dispatch, getState) => {
 
  let products;
  getState().products.cartItems
    ? (products = getState().products.cartItems)
    : (products = JSON.parse(localStorage.getItem('cartItems')));

  let price;
  getState().products.cartItems
    ? (price = parseFloat(getState().products.cartItems[index].price))
    : (price = parseFloat(JSON.parse(localStorage.getItem('cartItems'))[index].price));

  let total = 0;
  getState().products.itemsPrice
    ? (total = parseFloat(getState().products.itemsPrice))
    : (total = parseFloat(JSON.parse(localStorage.getItem('cartPrice'))));

  if (products[index].stock > products[index].count) {
    products[index].count++;
    const calcTotal = ((total * 100 + price * 100) / 100);

    localStorage.setItem('cartItems', JSON.stringify(products));
    localStorage.setItem('cartPrice', JSON.stringify(calcTotal));

    dispatch({
      type: 'CART_ITEMS_PRICE',
      payload: calcTotal,
    });
  }
};

export const decrementNr = (index) => (dispatch, getState) => {

  let products;
  getState().products.cartItems
    ? (products = getState().products.cartItems)
    : (products = JSON.parse(localStorage.getItem('cartItems')));

  let price;
  getState().products.cartItems
    ? (price = getState().products.cartItems[index].price)
    : (price = JSON.parse(localStorage.getItem('cartItems'))[index].price);

  let total = 0;
  getState().products.itemsPrice
    ? (total = getState().products.itemsPrice)
    : (total = JSON.parse(localStorage.getItem('cartPrice')));

  if (products[index].count > 1) {
    products[index].count--;
    const calcTotal = ((total * 100 - price * 100) / 100);

    localStorage.setItem('cartItems', JSON.stringify(products));
    localStorage.setItem('cartPrice', JSON.stringify(calcTotal));

    dispatch({
      type: 'CART_ITEMS_PRICE',
      payload: calcTotal,
    });
  }
};

export const checkStocks = (cartItems) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  axios
    .post(`${process.env.REACT_APP_URL_BACKEND}/orders/checkStock`, cartItems, config)
    .then((result) => {
      if (result.data.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(result.data));
        dispatch({
          type: 'STOCK_ERR',
          payload: true,
        });
      } else {
        dispatch({
          type: 'STOCK_ERR',
          payload: false,
        });
      }
      // console.log('REZ', result.data);
    })

    .catch((err) => {
      console.log(err);
    });
};

export const outOfStock = (cartItems) => (dispatch) => {
  axios
    .put(`${process.env.REACT_APP_URL_BACKEND}/orders/outOfStock`, cartItems)
    .then((result) => {
      dispatch(fetchProducts());
    })
    .catch((err) => {
      console.log(err);
    });
};


export const clearCart = () => (dispatch) => {
  localStorage.removeItem('cartPrice');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('deliveryInfo');
  dispatch({
    type: 'CART_ITEMS',
    payload: undefined,
  });

  dispatch({
    type: 'CART_ITEMS_PRICE',
    payload: undefined,
  });
};


export const checkDisocunt = (forDiscount, id) => (dispatch) => {
  // console.log('FOR DISCOUNT', forDiscount);
  // console.log('FOR DISCOUNT USER ID', id);
  dispatch({type:'DISCOUNT DETAILS'})
  axios
    .post(`${process.env.REACT_APP_URL_BACKEND}/orders/checkDiscount/${id}`, forDiscount)
    .then((result) => {
      // console.log("REDUX", result.data)
      if (result.data !== null) {
        dispatch({
          type: 'DISCOUNT DETAILS',
          payload: result.data,
        });
      } else {
        dispatch({
          type: 'DISCOUNT DETAILS',
          payload: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};