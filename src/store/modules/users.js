import server from '@/server';

export default {
    namespaced: true,
    state: {
        users: [],         
        total_users: 0,
        positions: [],
        imgMetrics: {width:0, height: 0},
        requestTrue: true,
        user_id: null
    },
    getters: {
        users(state){
            return state.users;
        }, 
        positions(state){
            return state.positions;
        },
        imgMetrics(state){
            return state.imgMetrics;
        }
    },
    mutations: {
        setTotalUsers(state, data) {             
            state.total_users = data.data.total_users;             
        },
        setUsers(state, data){          
            state.users = data.data.users.sort((a, b) => a.registration_timestamp < b.registration_timestamp ? 1 : -1);
        },
        setPositions(state, data){
            state.positions = data.data.positions;
        },
        setImgMetrics(state, data) {             
            state.imgMetrics.width = data.width;
            state.imgMetrics.height = data.height;             
        },
        setRequestTrue(state, data){
            state.requestTrue = data;
        },
        setUserId(state, data){
            state.user_id = data;             
        }
    },
    actions: {
        async getTotalUsers(store){
            let data = await server.get(`/users`).catch((e)=> {console.log(e)});
            if (data && data.data.success) {
                store.commit('setTotalUsers', data);
            }             
        },
        async getUsers(store){ 
            if (store.state.total_users > 0) {
                let users = await server.get(`/users?count=${store.state.total_users}`)
                .catch((e) => { console.log(e) });
                if (users && users.data.success) {
                    store.commit('setUsers', users);
                }                 
            }             
        },
        async getPositions(store){
            let positions = await server.get(`/positions`)
                .catch((e) => { console.log(e) });
            if (positions && positions.data.success) {
                store.commit('setPositions', positions);
            }
        },
        async registration(store, data){            
            let token = '';
            if (localStorage.getItem('token') && localStorage.getItem('token_exp') > Date.now()+10000) {
                token = localStorage.getItem('token');                 
            }else{
                let requestToken = await server.get('/token')
                .catch((error) => {
                  return error;
                 }); 
                if (requestToken.data && requestToken.data.success) {
                    localStorage.setItem('token', requestToken.data.token);
                    localStorage.setItem('token_exp', Date.now() + 2400000);
                    token = localStorage.getItem('token');
                }                  
            }  
             
            if (token != '' && store.state.requestTrue) {
                store.commit('setRequestTrue', false);                
                let result = await server.post('/users', data, { headers: { 'Token': token } })
                    .catch((error) => {                                                                        
                        return error;                            
                    });
                store.commit('setRequestTrue', true); 
                if (result && result.data && result.data.success) {
                    store.commit('setUserId', result.data.user_id);
                }
                return result;
            }else{
                return 1;
            }                 
        },
        setImgMetrics(store, data){
            store.commit('setImgMetrics', data );             
        }            
    }
} 