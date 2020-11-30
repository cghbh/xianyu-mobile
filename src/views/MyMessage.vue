<template>
  <div class="xianyu-message">
    <back-top title="消息" :back="false"></back-top>
    <div class="xianyu-message-container">
      <van-cell-group>
        <van-cell class="xianyu-message-style" value="58" title="点赞" is-link>
          <template #default>
            <van-tag type="danger">56</van-tag>
          </template>
        </van-cell>
        <van-cell class="xianyu-message-style" value="58" title="评论" is-link>
          <template #default>
            <van-tag type="danger">19</van-tag>
          </template>
        </van-cell>
        <van-cell class="xianyu-message-style" value="58" title="关注" is-link>
          <template #default>
            <van-tag type="danger">8</van-tag>
          </template>
        </van-cell>
        <van-cell class="xianyu-message-style" value="58" title="通知" is-link>
          <template #default>
            <van-tag type="danger">99+</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMessage'
}
</script>

<style scoped lang="scss">
.xianyu-message-container {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.xianyu-message-style {
  line-height: 45px;
  display: flex;
  align-items: center;

  /deep/ .van-cell__value {
    color: red;
  }

  /deep/ .van-tag {
    height: 22px;
    line-height: 22px;
    border-radius: 22px;
    text-align: center;
    padding: 0 10px;
  }
}

.xianyu-message-title {
  margin: 20px 0;
  padding-left: 16px;
  font-size: 16px;
  font-weight: 700;
}
</style>
