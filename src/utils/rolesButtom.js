import store from "../store/index";
export function buttonPermission(permission){
    const button = store.getters["appStore/buttons"];
    return button.indexOf(permission) != -1; //
}