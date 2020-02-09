import actionTypes from "./types";

export const addItem = (item) => {
	return {
                type: actionTypes.ADD_ITEM_SHOPPING_CART,
                payload: item
	};
};

export const deleteItem = (item) => {
        return {
                type: actionTypes.DELETE_ITEM_SHOPPING_CART,
                payload: item
        };
}