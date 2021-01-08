<template>
  <div
    class="xianyu-fellowing-container-item"
    :class="{ 'none': noBorderBottom }">
    <div class="xianyu-fellowing-item-left">
      <img @click="$emit('goDetail')" :src="user.avatar_url">
      <div class="xianyu-fellowing-item-left-user">
        <h1 @click="$emit('goDetail')" v-html="user.nickname"></h1>
        <span>{{ user.personal_sign }}</span>
      </div>
    </div>
    <div
      class="xianyu-fellowing-item-right"
      @click="$emit('cancelFollow')"
      v-if="isFollow && !isSelf"
    >
      取消关注
    </div>
    <div
      class="xianyu-fellowing-item-right active"
      v-if="!isFollow && !isSelf"
      @click="$emit('followMyFans')"
    >
      关注
    </div>
  </div>
</template>

<script>
// 是否是关注的，既然是我的关注，默认都是关注的状态
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
    },
    // 是否关注
    isFollow: {
      type: Boolean,
      default: false
    },
    isSelf: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-fellowing-container-item {
  display: flex;
  align-items: center;
  padding: 18px 12px;
  border-bottom: 1px solid rgba(68, 68, 68, .08);
  justify-content: space-between;
}

.xianyu-fellowing-container-item.none {
  border-bottom: none;
}

.xianyu-fellowing-item {
  &-left {
    display: flex;
    align-items: center;
    width: 72vw;
    margin-right: 10px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0px;
    }

    &-user {
      width: 221px;
      display: flex;
      flex-direction: column;
      padding-left: 8px;
      box-sizing: border-box;

      h1 {
        font-size: 16px;
        margin-bottom: 12px;
      }

      span {
        display: inline-block;
        width: 58vw;
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
