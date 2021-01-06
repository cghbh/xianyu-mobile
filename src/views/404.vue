<template>
  <div class="not-found">
    <div class="not-found-number-tips">
      <span>404</span>
      <p>NOT FOUND</p>
    </div>
    <p class="not-found-tips">外星人把这个页面吃掉了o((⊙﹏⊙))o.</p>
    <button class="not-found-back" @click="$router.push('/')">返回首页</button>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &-number-tips {
    font-size: 66px;
    color: #409fea;
    display: flex;
    align-items: baseline;
    margin-top: 120px;
    font-size: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin-bottom: 20px;
      font-size: 125px;
    }
  }

  &-tips {
    font-size: 18px;
    margin-top: 54px;
    color: rgba(38, 38, 38, .7);
  }

  &-back {
    margin-top: 54px;
    border: none;
    outline: none;
    color: #fff;
    background-color: #409fea;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 5px;
  }
}
</style>
