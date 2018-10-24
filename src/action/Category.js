import * as Types from '../constant/actionType';
import * as callApi from '../ultils/apiCaller';
// Get danh sách
export const actGetAllCategoryRequest = (params) => {
    debugger;
    return (dispatch) => {
        callApi.get('category/getlistpaging', params).then(
            res => {
                dispatch(actGetAllCategory(res.data));
            }
        );
    }
}
/// GetPaging
export const actGetAllCategory = (categories) => {
    debugger;
    return {
        type: Types.GetAllCategories,
        categories: categories.Items,
        totalRecords: categories.TotalCount
    }
}
// Thêm 
export const actAddCategoryRequest = (category) => {
    debugger;
    return (dispatch) => {
        debugger;
        return callApi.post('Category/create', category).then(res => {
            debugger;
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