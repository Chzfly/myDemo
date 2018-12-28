//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: []
  },
  onLoad() {
    var self = this;
    wx.request({
      url: "http://192.168.1.102:3000/list",
      success(res) {
        console.log(res.data)
        self.setData({
          result: res.data.result
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  gofabu() {
    wx.navigateTo({
      url: '/pages/shuoshuo/shuoshuo'
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    var self = this;
    wx.request({
      url: "http://192.168.1.102:3000/list",
      success(res) {
        console.log("刷新成功")
        console.log(res.data.result)
        self.setData({
          result: res.data.result
        })
      }
    })
  }
})
