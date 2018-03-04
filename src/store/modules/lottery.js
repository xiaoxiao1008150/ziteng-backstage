// import { getTemplates } from 'api/acitvity'

// 自己测试用数据
let lotteryData = [
  {num:'01',text:'超级大转盘',type:'slyder',templateNo:'123456'},
  {num:'02',text:'抽红包',type:'envelope',templateNo:'123456'},
  {num:'03',text:'欢乐拼图',type:'jigsaw'},
  {num:'04',text:'开宝箱',type:'box'}
];

const lottery = {
  state: {
    // lotteryData:lotteryData,
    lotteryData:[],//测试
    currentLotteryItem: {num:'01',text:'超级大转盘',type:'slyder',templateNo:'123456'}
    // currentLotteryItem: {}
  },

  mutations: {
    setCurrentLottery: (state, item) => {
      state.currentLotteryItem = item
    },
    initLotteryData: (state, item) => {
      state.lotteryData = item
    }
  }
}

export default lottery
