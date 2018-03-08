
const save = {
  state: {
    hasClickSave:false,
    barActive:false
  },

  mutations: {
    setClickSave: (state, value) => {
      state.hasClickSave = value
    },
    setBarActive: (state, value) => {
      state.barActive = value
      localStorage.set
    }
  }
}

export default save
