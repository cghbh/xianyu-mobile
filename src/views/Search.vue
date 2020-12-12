<template>
  <!-- 如果页面是取消搜索的话，取消页面的缓存功能 -->
  <div class="xianyu-search">
    <van-search
      @click="$router.push('/search')"
      @blur="userBlur"
      @search="onSearch"
      v-model.trim="searchValue"
      input-align="left"
      clearable
      autofocus
      placeholder="搜索好文/诗词/成语/用户"
      show-action>
      <template #action>
        <div @click="$router.go(-1)">取消</div>
      </template>
    </van-search>
    <div v-if="!showSearchArea" class="xianyu-search-container">
      <div class="xianyu-search-container-history" v-if="searchKeyWords.length">
        <div class="xianyu-search-container-history-title">
          <h2>历史记录</h2>
          <i @click="askClearSearchHistory" class="iconfont icon-delete"></i>
        </div>
        <div class="xianyu-search-container-history-container">
          <div
            class="xianyu-search-container-history-item"
            v-for="item in searchKeyWords"
            :key="item"
            @click="historySearch(item)">{{ item }}</div>
        </div>
      </div>
    </div>

    <div v-else class="search-result">
      <van-tabs v-model="active" animated swipeable color="#409fea">
        <van-tab title="好文">
          <divide-area></divide-area>
          <div class="search-results-container" v-if="artcileResult.length > 0">
            <article-item
              v-for="(item, index) in artcileResult"
              :article="item"
              :key="item._id"
              :no-margin-bottom="index === (artcileResult.length - 1)"
              @click="$router.push(`/article-detail/${item._id}`)"/>
          </div>
          <search-empty v-else></search-empty>
        </van-tab>
        <van-tab title="诗词">
          <divide-area></divide-area>
          <div class="search-results-container" v-if="poemResult.length > 0">
            <poem-item
              @click="$router.push('/ancient-poetry/' + item._id)"
              v-for="(item, index) in poemResult"
              :itemvalue="item"
              :key="item._id"
              :no-margin="index === poemResult.length - 1 "/>
          </div>
          <search-empty v-else></search-empty>
        </van-tab>
        <van-tab title="词典">
          <div class="search-word-container">
            <divide-area></divide-area>
            <div class="search-results-container" v-if="wordResult.length > 0">
              <dictionary-item
                v-for="item in wordResult"
                :dictionary="item.word_title"
                :key="item._id"
                @click="$router.push(`/dictionary-detail/${item._id}`)"/>
            </div>
            <search-empty v-else></search-empty>
          </div>
        </van-tab>
        <van-tab title="用户">
          <divide-area></divide-area>
          <div class="search-results-container" v-if="userResult.length > 0">
            <follow-item
              v-for="(item, index) in userResult"
              :no-border-bottom="index === 5"
              :key="item._id"
              :user="item"
              :is-follow="isLogin && myFollows.includes(item._id)"
              @followMyFans="followMyFansHandle(item._id)"
              @cancelFollow="cancelFollowHandle(item._id)"
            />
          </div>
          <search-empty v-else></search-empty>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>



<script>
import DivideArea from '@/components/PublicComponents/DivideArea.vue'
import ArticleItem from '@/components/ArticleItem/index.vue'
import FollowItem from '@/components/FansItem/index.vue'
import DictionaryItem from '@/components/DictionaryItem/index.vue'
import PoemItem from '@/components/PoemItem/index.vue'
import SearchEmpty from '@/components/SearchEmpty/index.vue'
import { getArticleList } from '@/api/article.js'
import { searchUsersByKeyWords, loadUserInfo, userFollows, userFollow, userCancelFollow } from '@/api/user.js'
import { getDictionaryList } from '@/api/dictionary.js'
import { getPoemList } from '@/api/poem.js'

export default {
  name: 'Search',
  data () {
    return {
      active: 0,
      searchValue: '',
      artcileResult: [],
      userResult: [],
      poemResult: [],
      wordResult: [],
      wordCurrentPage: 1,
      poemCurrentPage: 1,
      articleCurrentPage: 1,
      userCurrentPage: 1,
      // 按下回车键之后才开始执行搜索
      confirmSearch: false,
      userId: null,
      // 我的关注，用在搜索用户之后判断是否已经关注搜索到的用户
      myFollows: []
    }
  },

  deactivated () {
    if (this.$router.currentRoute.fullPath.split('?')[0] === '/') {
      // 页面卸载之后，默认搜索左侧第一个内容
      this.active = 0
      this.artcileResult = []
      this.poemResult = []
      this.userResult = []
      this.wordResult = []
      // 避免出现退出时清除输入框的抖动问题，延迟清除输入框
      setTimeout(() => {
        this.searchValue = ''
      }, 50)
    }
  },

  computed: {
    searchKeyWords () {
      return this.$store.state.searchKeyWords
    },
    // 搜索到的内容是否为空
    searchResultState () {
      return this.artcileResult.length > 0 || this.userResult.length > 0 || this.poemResult.length > 0 || this.wordResult.length > 0
    },
    // 是否显示搜索结果
    showSearchArea () {
      return this.searchValue.length > 0 && this.confirmSearch
    },
    isLogin () {
      return this.$store.state.token.token
    }
  },
  watch: {
    active: {
      handler (newVal) {
        // 切换搜索内容的时候，如果有数据则不发送请求，除非上拉加载更多的情况
        if (newVal === 0) {
          if (this.artcileResult.length <= 0) {
            this.searchArticles()
          }
        } else if (newVal === 1) {
          if (this.poemResult.length <= 0) {
            this.searchPoems()
          }
        } else if (newVal === 2) {
          if (this.wordResult.length <= 0) {
            this.searchWords()
          }
        } else if (newVal === 3) {
          if (this.userResult.length <= 0) {
            this.searchUsers()
          }
        }
      }
    },
    searchValue (newVal, oldVal) {
      if (oldVal.length > 0) {
        this.confirmSearch = false
      }
    }
  },

  methods: {
    // 回车搜索
    onSearch () {
      if (this.searchValue.trim().length <= 0) {
        this.searchValue = ''
        return this.$toast('搜索的内容不能为空！')
      }
      this.confirmSearch = true
      this.$store.commit('addSearchKeyWords', this.searchValue)
      this.getSearchResultByActive(this.active)
    },
    // 询问是否删除搜索历史
    askClearSearchHistory () {
      this.$dialog.confirm({
        title: '是否清除历史记录？',
        width: '280px'
      })
        .then((e) => {
          this.$store.commit('clearSearchKeyWords')
          this.$toast({ message: '清除成功！', position: 'top' })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    userBlur () {
      this.artcileResult = this.userResult = this.poemResult = this.wordResult = []
    },
    async searchUsers () {
      const result = await searchUsersByKeyWords(this.searchValue)
      if (result.errno === 0) {
        this.userResult = result.data
        if (this.isLogin) {
          const userIdResult = await loadUserInfo()
          if (userIdResult.errno === 0) {
            this.userId = userIdResult.data._id
          }
          if (userIdResult.data._id) {
            const myFollowResult = await userFollows(userIdResult.data._id, this.userCurrentPage)
            if (myFollowResult.errno === 0) {
              myFollowResult.data.forEach(item => {
                this.myFollows.push(item._id)
              })
            }
          }
        }
      }
    },
    async searchWords () {
      const result = await getDictionaryList(this.wordCurrentPage, this.searchValue)
      if (result.errno === 0) {
        this.wordResult = result.data
      }
    },
    async searchPoems () {
      const result = await getPoemList(this.poemCurrentPage, this.searchValue)
      if (result.errno === 0) {
        this.poemResult = result.data
      }
    },
    async searchArticles () {
      const result = await getArticleList(this.articleCurrentPage, this.searchValue)
      if (result.errno === 0) {
        this.artcileResult = result.data
      }
    },
    // 点击搜索记录搜索
    historySearch (item) {
      this.confirmSearch = true
      this.searchValue = item
      this.onSearch()
    },
    // 根据切换的active的值搜索不同的内容
    getSearchResultByActive (value) {
      if (value === 0) {
        this.searchArticles()
      } else if (value === 1) {
        this.searchPoems()
      } else if (value === 2) {
        this.searchWords()
      } else if (value === 3) {
        this.searchUsers()
      }
    },

    // 搜索到用户关注，但是需要先判断当前用户是否登录
    async followMyFansHandle (id) {
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        // 已登录执行关注的操作
        const result = await userFollow(id)
        if (result.errno === 0) {
          if (!this.myFollows.includes(id)) {
            this.myFollows.push(id)
          }
          this.$toast('关注成功')
        }
      }
    },

    // 已关注可以取消关注
    async cancelFollowHandle (id) {
      const result = await userCancelFollow(id)
      if (result.errno === 0) {
        const index = this.myFollows.indexOf(id)
        if (index > -1) {
          this.myFollows.splice(index, 1)
        }
        this.$toast('取消关注成功')
      }
    }
  },

  components: {
    ArticleItem,
    DivideArea,
    FollowItem,
    DictionaryItem,
    PoemItem,
    SearchEmpty
  }
}
</script>

<style scoped lang="scss">
.xianyu-search {
  height: 100%;

  /deep/ .van-search__action {
    background-color: transparent;
    color: #666;
  }

  /deep/ .van-tab {
    font-size: 16px;
  }

  /deep/ .divide-area {
    background-color: rgba(38, 38, 38, .07);
  }

  /deep/ .xianyu-dictionary-item,
  /deep/ .ancient-item {
    margin-bottom: 0;
    border-bottom: 1px solid #efefef;
  }
}

.xianyu-search-container {
  background-color: #fff;

  &-history {
    padding: 15px 15px 0 15px;
    &-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      h2 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(0, 0, 0, .6);
        user-select: none;
      }

      .iconfont {
        font-size: 17px;
        color: #e92322;
      }
    }
    &-container {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      font-size: 12px;
      color: #555;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      padding: 5px 10px;
      margin-right: 10px;
      user-select: none;
      border-radius: 4px;
    }
  }
}

.xianyu-search-topic {
  padding: 0 15px 15px 15px;
  &-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, .6);
    user-select: none;
    padding-top: 18px;
    margin-bottom: 8px;
  }
  &-container {
    &-item {
      font-size: 14px;
      color: #555;
      margin-top: 15px;
      font-weight: 400;
      user-select: none;
      display: flex;
      align-items: center;
      padding: 3px;
      border-radius: 4px;
      color: rgba(0, 0, 0, .6);

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .iconfont {
        color: #fff;
        font-size: 11px;
        padding: 4px;
        background-color: #409fea;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }
}

.search-word-container {
  // background-color: rgba(38, 38, 38, .07);

  /deep/ .divide-area {
    // background-color: #fff;
  }
}

.search-results-container {
  /deep/ .xianyu-article-item {
    margin-bottom: 5px;
    border-bottom: 1px solid #efefef;
  }
}
</style>
