<template>
  <div class="item">
    <div class="img">
      <img :src="cardData.imgUrl" />
    </div>
    <div class="sales-data">
      <p class="text">{{cardData.title}}</p>
      <p class="num">{{cardData.count}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  flex: 0 0 100px;
  margin-bottom: 50px;
  justify-content: space-between;
  .item {
    height: 90px;
    width: 244px;
    padding: 20px 20px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    > .img {
      height: 100%;
      margin-right: 20px;
      flex: 0 0 50px;
    }
    .sales-data {
      height: 100%;
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 14px;
      .text {
        color: #ccc;
        font-size: 18px;
      }
    }
  }
}
</style>