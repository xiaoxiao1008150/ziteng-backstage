const clientList = {
  state:{
    aciByStatus: [],
    aciList:[]
  },
  mutations:{
    setAciStatusList(state, item){
      state.aciByStatus = item
    },
    handleAdd(state, item) {
      state.ListByStatus = [...state.ListByStatus, item]
    },
    aciRemove(state, id) {
      state.aciByStatus = state.aciByStatus.filter(obj => obj.id !== id)
    },
    aciUpdate(state, newObj) {
      let id  =  newObj.id
      state.clientList = state.clientList.map(
        obj => {
         return  (obj.id === id ? Object.assign(obj, newObj) : obj)
        }
      )
    },
    setAciList(state, item){
      state.aciList = item
    },
  }
}
export default clientList