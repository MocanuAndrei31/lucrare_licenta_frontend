import axios from "axios";

export const FETCHING_PRODUCTS = "FETCHING_PRODUCTS";
export const FETCHED_PRODUCTS = "FETCH_PRODUCTS";
export const ERROR_FETCH = "ERROR_FETCH";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: FETCHING_PRODUCTS });
  axios
    .get(`${process.env.REACT_APP_URL_BACKEND}/products`)
    .then((products) => {
      dispatch({
        type: FETCHED_PRODUCTS,
        payload: products.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_FETCH,
        payload: err,
      });
    });
};

export const createProduct = (product) => (dispatch, getState) => {
  console.log("PROD", product);
  const formData = new FormData();
  formData.append("category", product.category);
  formData.append("image", product.image);
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("sub_category", product.subcategory);
  formData.append("description", product.description);
  // formData.append('caracteristics', product.caracteristics);

  const token = getState().auth.token;

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  if (token) {
    config.headers["auth-token"] = token;
  }

  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/products/create`,
      formData,
      config
    )
    .then((result) => {
      dispatch({
        type: CREATE_PRODUCT,
        payload: result.data,
      });
      dispatch(fetchProducts());
    })
    .catch((err) => console.log(err));
};

export const editProduct = (product) => (dispatch, getState) => {
  const {
    category,
    id,
    name,
    price,
    discount,
    stock,
    subcategory,
    description,
    // caracteristics,
  } = product;

  const productInfo = {
    id,
    category,
    sub_category: subcategory,
    name,
    price,
    discount,
    stock,
    description,
  };

  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["auth-token"] = token;
  }

  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/products/edit`,
      productInfo,
      config
    )
    .then((result) => {
      dispatch(fetchProducts());
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (id) => (dispatch, getState) => {
  if (window.confirm("Are you sure you want to delete?")) {
    const token = getState().auth.token;
    const config = { headers: { "Content-type": "application/json" } };

    if (token) {
      config.headers["auth-token"] = token;
    }

    axios
      .delete(`${process.env.REACT_APP_URL_BACKEND}/products/${id}`, config)
      .then((res) => {
        dispatch(fetchProducts());
        window.location.reload();
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Canceled!");
  }
};

export const getProdInfo = (id) => (dispatch) => {
  const prodID = {
    ID: id,
  };
  const config = { headers: { "Content-Type": "application/json" } };
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/products/getProduct`,
      prodID,
      config
    )
    .then((result) => {
      dispatch({
        type: "CREATE_PROD_INFO",
        payload: result.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchMostPopularProd = () => (dispatch) => {
  axios
    .get(`http://localhost:5001/orders/mostPopular`)
    .then((result) => {
      console.log("RES FETCH MOST POPULAR", result);
      dispatch({
        type: "MOST_POP_PROD",
        payload: result.data,
      });
    })
    .catch((err) => console.log(err));
};
