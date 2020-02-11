<template>
  <div class="row">
    <div
      class="col-md-3 no-padding"
      v-for="product in products"
      :key="product.id"
      :product="product"
    >
      <b-card class="product" @click="navigateToDetailView(product, $event)"
        img-src="https://picsum.photos/400/400/?image=20">
        <span class="product-name">{{ product.name }}</span>
        <b-card-text>{{ product.description }}</b-card-text>
        <b-card-text class="allign-end"> Rs. {{ product.price }}</b-card-text>
        <b-button class="iterate-btn-add" @click="addToCart(product)">Add to Cart</b-button>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Helper } from '@/helper/Helper'

@Component({
  computed: mapState({
    // retrive all product stock from mapping state
    products: (state: any) => state.stock.ALL_STOCK
  })
})
export default class ProductsComponent extends Vue {
  public products!: any[];

  created () {
    this.$store.dispatch('stock/fetchAllProducts')
  }

  // navigate to product detail view
  navigateToDetailView (product: any, event: any) {
    if (event.target.className === 'card-img') {
      this.$router.push({ name: 'product-detail', params: { id: product.id } })
    }
  }

  addToCart (product: any) {
    const foo = this.$store
      .dispatch('stock/addItemToCart', {
        item: product,
        qty: 1
      })
    console.log(foo)
    // .then(() => {
    //   // when successful nofity the mini cart on updating selected item status
    //   Helper.sendNotifier(true)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card:hover {
  cursor: pointer;
}
.iterate-btn {
  height: 38px;
  width: 20%;
  border-radius: 5px;
  color: #4d4d4d;
  background-color: #ebebeb;
  border-color: #adadad;
  border: 1px #e5e5e5 solid;
}
.iterate-btn-add {
  width: 96%;
  margin-bottom: 10px;
}
.no-padding {
  padding-left: 0px;
  padding-right: 0px;
}
.card {
  margin: 5px;
  min-height: 300px;
  margin-bottom: 5px;
  box-shadow: 3px 4px 5px -1px rgba(163,163,163,1);
  border-radius: 5px;
}
.card-body {
  padding: 3px;
  margin-top: 5px;
}
.card-text {
  padding-left: 5px;
  padding-right: 5px;
  min-height: 20px;
  max-height: 69px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 0px;
  color: #8e8e8e;
  font-size: 12.4px;
  margin-bottom: 6px;
}
.product-name {
  display: flex;
  padding-left: 5px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.allign-end {
  color: #4d4d4d;
  font-weight: 600;
  text-align: end;
}
</style>
