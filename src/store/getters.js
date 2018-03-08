const getters = {
  // sidebar: state => state.app.sidebar,
  // language: state => state.app.language,
  // visitedViews: state => state.tagsView.visitedViews,
  hasClickSave: state => state.globalSave.hasClickSave,
  barActive: state => state.globalSave.barActive,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  flag: state => state.user.flag,
  lotteryData: state => state.lottery.lotteryData,
  currentLotteryItem: state => state.lottery.currentLotteryItem,
  isCreate: state => state.lottery.isCreate,
  preparePath: state => state.lottery.preparePath,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
  // errorLogs: state => state.errorLog.logs
}
export default getters
