// import { getTemplates } from 'api/acitvity'

// 自己测试用数据
let lotteryData = [
  {num:'01',text:'超级大转盘',type:'slyder',templateNo:'123456'},
  {num:'02',text:'抽红包',type:'envelope',templateNo:'234567'},
  {num:'03',text:'欢乐拼图',type:'jigsaw'},
  {num:'04',text:'开宝箱',type:'box'}
];

const lottery = {
  state: {
    lotteryData:lotteryData,
    // lotteryData:[],//测试
    // currentLotteryItem: {num:'01',text:'超级大转盘',type:'slyder',templateNo:'123456'},
    currentLotteryItem: {},
    isCreate: false,
    preparePath:'',// 设置离开时候点击的url地址
    isSubmit:false
  },

  mutations: {
    setCurrentLottery: (state, item) => {
      // let localItem = localStorage.getItem('template')
        state.currentLotteryItem = item
        // localStorage.setItem('template',item)
    },
    initLotteryData: (state, item) => {
      state.lotteryData = item
    },
    setLotteryStatus: (state, item) => {
      state.isCreate = item
    },
    setPreparePath: (state, item) => {
      state.preparePath = item
    },
    setIsSubmit: (state, item) => {
      state.isSubmit = item
    }
  }
}

export default lottery
