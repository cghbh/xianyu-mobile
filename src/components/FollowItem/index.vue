<template>
  <div class="xianyu-fellowing-container-item" :class="{ 'none': noBorderBottom }">
    <div class="xianyu-fellowing-item-left">
      <img :src="user.avatar_url">
      <div class="xianyu-fellowing-item-left-user">
        <h1>{{ user.nickname }}</h1>
        <span>{{ user.personal_sign }}</span>
      </div>
    </div>
    <div class="xianyu-fellowing-item-right" v-if="isFollowed">取消关注</div>
    <div class="xianyu-fellowing-item-right active" :class="{ 'active': !isFollowed }" v-else>关注</div>
  </div>
</template>

<script>
export default {
  name: 'FollowItem',
  props: {
    noBorderBottom: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isFollowed: true
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-fellowing-container-item {
  display: flex;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid rgba(68, 68, 68, .08);
}

.xianyu-fellowing-container-item.none {
  border-bottom: none;
}

.xianyu-fellowing-item {
  &-left {
    width: 270px;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 14px;
    }

    &-user {
      width: 221px;
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 16px;
        margin-bottom: 12px;
      }

      span {
        display: inline-block;
        width: 100%;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  &-right {
    width: 80px;
    height: 28px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    background-color: #409fea;
    color: #fff;
    padding: 4px;
    box-sizing: border-box;
  }

  &-right.active {
    background-color: #fff;
    color: #409fea;
    border: 1px solid #409fea;
  }
}
</style>
