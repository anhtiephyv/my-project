import * as Types from './../constant/actionType';
var initialState = [];
var finIndex = (categories, id) => {
    let result = -1;
    categories.forEach((category, index) => {
        if (category.id === id) {
            result = index;
        }
    })
    return result;
}
// const categories = (state = initialState, action) => {
//     var index = -1;
//     let { id } = action;
//     switch (action.type) {
//         case Types.GetAllCategories: {
//             state = action.categories;
//             return [...state];
//         }
//         case Types.AddCategory: {
//             debugger;
//             state.push(action.category)
//             return [...state];
//         }
//         case Types.DeleteCategory: {
//             index = finIndex(state, id);
//             state.splice(index, 1);
//             return [...state];
//         }
//         default: return [...state];
//     }
// };

// export default categories;
//import * as Types from '../constant/actionType'

export default function categories(state = { categories: initialState, totalRecords: 0 }, action) {
    var index = -1;
    let { id } = action;
    switch (action.type) {
        case Types.GetAllCategories: {
            debugger;
            return { ...state, categories: action.categories, totalRecords: action.totalRecords }
        }
        case Types.AddCategory: {
            state.categories.unshift(action.category);
            // state.totalRecords = state.totalRecords+1;
            return { ...state, totalRecords: state.totalRecords + 1 }
            //  return state;
        }
        case Types.DeleteCategory: {
            index = finIndex(state.categories, id);
            state.categories.splice(index, 1);
            return [...state];
        }
        default: return state;
    }
}

