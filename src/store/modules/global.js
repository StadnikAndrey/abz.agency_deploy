export default {
    namespaced: true,
    state: {
        router_link_activ_class: 'router_link_activ_class',
        target_item_menu: window.location.pathname
    },
    getters: {
        router_link_activ_class(state) {
            return state.router_link_activ_class;
        },
        target_item_menu(state){
            return state.target_item_menu;
        }         
    },
    mutations: {
        target_item_menu(state, data) {
            state.target_item_menu = data;
        }
    },
    actions: {
        target_item_menu(store, data) {
            store.commit('target_item_menu', data);
        }
    }
};