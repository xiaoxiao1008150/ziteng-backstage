const activityList = {
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
    aciUpdateByStatus(state, newObj) {
      let id  =  newObj.id
      state.aciByStatus = state.aciByStatus.map(
        obj => {
         return  (obj.id === id ? Object.assign(obj, newObj) : obj)
        }
      )
    },
    aciUpdate(state, newObj) {
      let id  =  newObj.id
      state.aciList = state.aciList.map(
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
export default activityList