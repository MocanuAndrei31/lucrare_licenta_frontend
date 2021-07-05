import {
  FETCHING_PRODUCTS,
  FETCHED_PRODUCTS,
  ERROR_FETCH,
  CREATE_PRODUCT,
} from "../actions/productsActions";

const initState = {
  loading: false,
  error: null,
  products: [],
  createdProduct: undefined,
  itemsPrice: 0,
  statusRedirect: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCHING_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ERROR_FETCH:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCHED_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        createdProduct: action.payload,
      };

    case "CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "CART_ITEMS_PRICE":
      return {
        ...state,
        itemsPrice: action.payload,
      };
    case "DELIVERY_INFO":
      return {
        ...state,
        deliveryInfo: action.payload,
      };
    case "USER_POINTS":
      return {
        ...state,
        userPoints: action.payload,
      };
    case "USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
      };
    case "ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "USERS_ORDERS":
      return {
        ...state,
        usersOrders: action.payload,
      };
    case "SIDE_BAR":
      return {
        ...state,
        openSideBar: action.payload,
      };

    case "STATUS":
      return {
        ...state,
        statusPopUp: action.payload,
      };
    case "STOCK_ERR":
      return {
        ...state,
        stockErr: action.payload,
      };
    case "STATUS_ZIP_CODE":
      return {
        ...state,
        statusZipCode: action.payload,
      };
    case "CREATE_FILTERS":
      return {
        ...state,
        createFilters: action.payload,
      };
    case "CREATE_FILTERS_WINES":
      return {
        ...state,
        createFiltersWines: action.payload,
      };
    case "FILTERED_PROD":
      return {
        ...state,
        filteredProd: action.payload,
      };
    case "GET_PROGRAM":
      return {
        ...state,
        getProgram: action.payload,
      };
    case "CREATE_PROD_INFO":
      return {
        ...state,
        getProdInfo: action.payload,
      };
    case "STRIPE_SECRET":
      return {
        ...state,
        stripeSecret: action.payload,
      };
    case "CREATE_USER_ORDER":
      return {
        ...state,
        statusUserOrder: action.payload,
      };
    case "CREATE_ORDER":
      return {
        ...state,
        statusOrder: action.payload,
      };
    case "USER_VOUCHERS":
      return {
        ...state,
        userVouchers: action.payload,
      };
    case "DISCOUNT DETAILS":
      return {
        ...state,
        discountDetails: action.payload,
      };
    case "FETCH_USERS":
      return {
        ...state,
        fetchUsers: action.payload,
      };
    case "MOST_POP_PROD":
      return {
        ...state,
        fetchMostPopular: action.payload,
      };
    case "CONTACT_MSG":
      return {
        ...state,
        contactMsg: action.payload,
      };

    default:
      return state;
  }
};
