// pages/shuoshuo/shuoshuo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    picArr: []
  },
  changeContent(e){
    this.setData({
      content: e.detail.value
    })
  },
  choose(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          picArr: res.tempFilePaths
        })
      },
    })
  },
  upload(){
    var content = this.data.content;
    var nickName = app.globalData.userInfo.nickName;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var picArr = this.data.picArr,
        len = this.data.picArr.length;
    var fwqPics = [];
    for (var i = 0; i < len; i++) {
      wx.uploadFile({
        url: 'http://192.168.1.102:3000/upload', 
        filePath: picArr[i],
        name: 'file',
        formData: {
          user: 'test'
        },
        success(res) {
          var result = JSON.parse(res.data).result;
          fwqPics.push(result);
          if(fwqPics.length == len){
            //图片文件上传完毕，将这次的说说数据提交到后端
            wx.request({
              url: 'http://192.168.1.102:3000/shuoshuo',
              method: 'POST',
              data: {
                nickName,
                content,
                avatarUrl,
                fwqPics
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res){
                wx.showToast({
                  title: '发送成功',
                  icon: "success",
                  duration: 1000
                });
                wx.navigateBack();
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})