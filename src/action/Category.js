import * as Types from '../constant/actionType';
import * as callApi from './../ultils/apiCaller';
// Get danh sách
export const actGetAllCategoryRequest = (data) => {
    return (dispatch) => {
        dispatch(actGetAllCategory(data));
    }
}
/// GetPaging
export const actGetAllCategory = (categories) => {
    return {
        type: Types.GetAllCategories,
        categories: categories.Items,
    }
}
// Thêm 
export const actAddCategoryRequest = (category) => {
    return (dispatch) => {
        return callApi('Category/create', 'POST', category).then(res => {
            dispatch(actAddCategory(res.data));
        })
    }
}
export const actAddCategory = (category) => {
    return {
        type: Types.AddCategory,
        category
    }
}

// Xóa
export const actDeleteCategoryRequest = (id) => {
    debugger;
    return (dispatch) => {
        callApi(`Category/delete/?id=${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteCategory(id));
        })
    }
}
export const actDeleteCategory = (id) => {
    return {
        type: Types.DeleteCategory,
        id
    }
}