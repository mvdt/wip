<template>
  <div class="row">
    <div class="col-md-12 back-row">
      <i class="material-icons pos-15">arrow_back</i>
      <router-link class="pos-left" to="/products/all" rel="prev">Back To product List</router-link>
    </div>
    <div class="col-md-12" v-if="product">
      <b-card>
        <div class="col-md-6">
          <div>
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="1024"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- <b-carousel-slide
                caption="First slide"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="https://picsum.photos/1024/480/?image=52"
              ></b-carousel-slide>

              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                <h1>Hello world!</h1>
              </b-carousel-slide>

              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

              <b-carousel-slide>
                <img
                  slot="img"
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="https://picsum.photos/1024/480/?image=55"
                  alt="image slot"
                >
              </b-carousel-slide>-->
              <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
              <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
              <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
              <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>
        <div class="col-md-6 allign-left">
          <div class="row">
            <div class="col-md-12 font-30">{{ product.name }}</div>
            <div class="col-md-12 font-25">Rs. {{ product.price.toFixed(2) }}</div>
            <div class="col-md-12 descrip-top" id="style-2">{{ product.description }}</div>
          </div>
          <div class="row pos-bottom">
            <div class="col-md-6">
              <div class="row">
                <div class="col-xs-4 content">
                  <button class="btn btn-default iterate-btn" @click="decreaseAmount()">-</button>
                </div>
                <div class="col-xs-4 content">
                  <input v-model="currentElemQty" type="text" disabled class="qty-amount disabled">
                </div>
                <div class="col-xs-4 content">
                  <button class="btn btn-default iterate-btn" @click="increaseAmount()">+</button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <button
                class="btn btn-default iterate-btn iterate-btn-add"
                @click="addToCart(product)"
              >Add To Cart Rs. {{ currentElemPrice.toFixed(2) }}</button>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Helper } from '@/helper/Helper'

@Component
export default class ProductDetailComponent extends Vue {
  // @Prop() public id: any; find out hoe to get this by input prop
  product: any = {};
  currentElemPrice: number = 0;
  currentElemQty: number = 0;

  public created () {
    let currentProductID = this.$router.currentRoute.params.id
    // retrieve currently selected product information from getter
    this.product = this.$store.getters['stock/getProductById'](
      currentProductID
    )

    if (this.product == undefined) {
      this.$store.dispatch('stock/fetchAllProducts').then(() => {
        // retrieve currently selected product information from getter
        this.product = this.$store.getters['stock/getProductById'](
          currentProductID
        )
      })
    }
  }

  increaseAmount () {
    this.currentElemQty == 10
      ? (this.currentElemQty = 10)
      : this.currentElemQty > 10
        ? (this.currentElemQty = 10)
        : this.currentElemQty++
    this.currentElemPrice = this.product.price * this.currentElemQty
  }

  decreaseAmount () {
    this.currentElemQty == 1
      ? (this.currentElemQty = 1)
      : this.currentElemQty == 0
        ? (this.currentElemQty = 0)
        : this.currentElemQty--
    this.currentElemPrice = this.product.price * this.currentElemQty
  }

  addToCart (product: any) {
    if (this.currentElemQty > 0) {
      this.$store
        .dispatch('stock/addItemToCart', {
          item: product,
          qty: this.currentElemQty
        })
        .then(() => {
          // when successful nofity the mini cart on updating selected item status
          Helper.sendNotifier(true)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.allign-left {
  text-align: left;
}
.card-body {
  display: flex;
  min-height: 547px;
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
.disabled {
  cursor: not-allowed;
}
.qty-amount {
  width: 45%;
  border-radius: 5px;
  border: 1px #e5e5e5 solid;
  margin-top: 2px;
  text-align: center;
  border-radius: 5px;
  border: 1px #e5e5e5 solid;
  margin-top: 2px;
  margin-left: 12px;
  margin-right: 12px;
}
.content {
  display: contents;
}
.iterate-btn-add {
  width: 100%;
}
.pos-bottom {
  position: absolute;
  bottom: 0;
  padding-left: 15px;
  padding-right: 5px;
}
.font-30 {
  font-size: 30px;
  font-weight: lighter;
}
.font-25 {
  font-size: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
.back-row {
  text-align: left;
  padding-bottom: 20px;
}
.pos-15 {
  position: relative;
  top: 15px;
}
.pos-left {
  position: relative;
  top: 9px;
  left: 7px;
}
.pos-left:hover {
  text-decoration: none;
}
.descrip-top {
  max-height: 213px;
  min-height: 350px;
  overflow-y: scroll;
}
.carousel {
  position: absolute;
  height: -webkit-fill-available;
}
#style-2::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
#style-2::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
#style-2::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
</style>
