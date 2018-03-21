const clientList = {
  state:{
    ListByStatus: [],
    clientList:[]
  },
  mutations:{
    setStatusList(state, item){
      state.ListByStatus = item
    },
    handleAdd(state, item) {
      state.ListByStatus = [...state.ListByStatus, item]
    },
    handleRemove(state, id) {
      state.ListByStatus = state.ListByStatus.filter(obj => obj.id !== id)
    },
    handleUpdate(state, newObj) {
      let id  =  newObj.id
      state.clientList = state.clientList.map(
        obj => {
         return  (obj.id === id ? Object.assign(obj, newObj) : obj)
        }
      )
    },
    setClientList(state, item){
      state.clientList = item
    },
  }
}
export default clientList