import * as Types from '../constant/actionType';
import * as callApi from '../ultils/apiCaller';
// Get danh sách
export const actGetAllCategoryRequest = (params) => {
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
    return {
        type: Types.GetAllCategories,
        categories: categories.Items,
        totalRecords: categories.TotalCount
    }
}
// Thêm 
export const actAddCategoryRequest = (category) => {
    return Promise.resolve(callApi.post('Category/create', category));
}
// Sửa
export const actUpdateCategoryRequest = (category) => {
    return Promise.resolve(callApi.put('Category/update', category));
}
// Xóa
export const actDeleteCategoryRequest = (id) => {
        return Promise.resolve(callApi.deleteItem(`Category/delete`, id));
}
// Get tree
export const actgetCategoryTreeRequest = (ParentCategory) => {
    return (dispatch) => {
        callApi.get('category/GetTreeData', ParentCategory).then(
            res => {
                dispatch(actgetCategoryTree(res.data));
            }
        );
    }
}
export const ditmeban = (ParentCategory) => {
    return Promise.resolve(callApi.get('category/GetTreeData', ParentCategory));
    
}
/// GetPaging
export const actgetCategoryTree = (data) => {
    return {
        type: Types.getCategoryTree,
        categoriesTree: data,
    }
}