const getters = {
  // sidebar: state => state.app.sidebar,
  // language: state => state.app.language,
  // visitedViews: state => state.tagsView.visitedViews,
  hasClickSave: state => state.globalSave.hasClickSave,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  lotteryData: state => state.lottery.lotteryData,
  currentLotteryItem: state => state.lottery.currentLotteryItem,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
  // errorLogs: state => state.errorLog.logs
}
export default getters
