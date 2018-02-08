
const save = {
  state: {
    hasClickSave:false
  },

  mutations: {
    setClickSave: (state, value) => {
      state.hasClickSave = value
    }
  }
}

export default save
