<template>
  <div class="moment-joke">
    <van-sticky>
      <van-nav-bar title="开心一刻" sticky left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="moment-joke-content">
      话说有一只猴子，死后去见阎罗王！这猴子说，下辈子我不想再做猴子了，想转世为人！阎罗王想了想，说：“好吧。既然你想做人，那么必须把身上的毛全部拔掉。”说完，立马叫来了夜叉，给猴子拔毛。谁知道才刚拔第一根，猴子就痛得大叫，大呼受不了了。阎王哈哈大笑说：“哎，你看你，一毛不拔，如何能做人呢？”
    </div>
    <divide-area></divide-area>
    <comment-item></comment-item>
    <bottom-comment></bottom-comment>
    <refresh-icon></refresh-icon>
  </div>
</template>

<script>
import BottomComment from '../components/BottomComment/index.vue'
import CommentItem from '../components/BottomComment/comment.vue'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
export default {
  name: 'MomentJoke',
  components: {
    BottomComment,
    CommentItem,
    DivideArea
  }
}
</script>

<style>
.moment-joke {
  background-color: #fff;
}
.moment-joke-content {
  height: 520px;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 32px;
  padding: 0 20px;
  text-indent: 1.3em;
}
</style>
