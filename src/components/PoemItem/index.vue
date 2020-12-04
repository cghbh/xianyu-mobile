<template>
  <div class="ancient-item">
    <div class="ancient-item-title">
      <h1>{{ itemvalue.poem_title }}</h1>
      <p>
        [<span>{{ itemvalue.author_dynasty }}</span>]
      </p>
    </div>
    <p class="ancient-item-author">{{ itemvalue.poem_author }}</p>
  </div>
</template>

<script>
export default {
  name: 'PoemItem',
  props: {
    // 默认的情况下每个div都有margin-bottom，针对最后一个元素不需要margin的情况
    last: {
      type: Boolean,
      default: true
    },
    itemvalue: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.ancient-item {
  padding: 20px 15px 15px 15px;
  margin-bottom: 12px;
  background-color: #fff;
  &-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    h1 {
      font-size: 16px;
    }

    p {
      font-size: 13px;
      display: flex;
      align-items: center;

      span {
        margin: 0 1px;
      }
    }
  }

  &-author {
    font-size: 13px;
    color: #666;
  }
}

.ancient-item.no-margin {
  margin-bottom: 0;
}
</style>
