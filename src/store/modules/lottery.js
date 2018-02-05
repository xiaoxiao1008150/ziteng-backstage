let lotteryData = [
  {num:'01',text:'超级大转盘'},
  {num:'02',text:'抽红包'},
  {num:'03',text:'欢乐拼图'},
  {num:'04',text:'开宝箱'}
]
// let tabData = [
//   {label:'首页', name:'first'},
//   {label:'抽奖页', name:'second'},
//   {label:'中奖页', name:'third'},
//   {label:'未中奖', name:'four'},
//   {label:'结束页', name:'five'},
// ]
const lottery = {
  state: {
    lotteryData:lotteryData,
    currentLotteryItem: {num:'01',text:'超级大转盘'}
  },

  mutations: {
    setCurrentLottery: (state, item) => {
      state.currentLotteryItem = item
    }
  }
}

export default lottery
