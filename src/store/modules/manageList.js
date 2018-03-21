const manageList = {
  state:{
    manageList: []
  },
  mutations:{
    setManageList(state, item){
      state.manageList = item
    },
    // handleAdd(state, item) {
    //   state.ListByStatus = [...state.ListByStatus, item]
    // },
    // handleRemove(state, id) {
    //   state.ListByStatus = state.ListByStatus.filter(obj => obj.id !== id)
    // },
    manageUpdate(state, newObj) {
      let id  =  newObj.id
      state.manageList = state.manageList.map(
        obj => {
         return  (obj.id === id ? Object.assign(obj, newObj) : obj)
        }
      )
    }
  }
}
export default manageList