<template>
  <div class="row scroll" id="style-mini-scroller">
    <div class="col-md-12 mini-end-allign">
      <h4 class="title">YOUR CART</h4>
      <span class="example-spacer"></span>
      <a class="mini-shopping-cart-a" @click="navigateToCart()">
        <i class="material-icons">shopping_cart</i>
        <label
          class="mini-count-label"
          v-bind:class="[currentlySelected > 0 ? 'active-mini' : 'deactive-mini']"
        >{{ currentlySelected }}</label>
      </a>
    </div>
    <div class="col-md-12 cart-item" v-for="item in currentList" :key="item.id">
      <div class="display-flex">
        <span class="mini-allign-left size-13">
          {{ item.name }}
          <br>
          <span class="size-10">Rs. {{ (item.price * item.quantity).toFixed(2) }}</span>
        </span>
        <span class="example-spacer"></span>
        <span>
          <span @click="decreaseCount(item)" class="line-icon-button pos-15">
            <i class="material-icons size-21">remove_circle_outline</i>
          </span>
          <label class="pos-10">{{ item.quantity }}</label>
          <span @click="increaseCount(item)" class="line-icon-button pos-5">
            <i class="material-icons size-21">add_circle_outline</i>
          </span>
          <span @click="removeFromList(item)" class="line-icon-button">
						<i class="material-icons size-21 red-icon">delete</i>
					</span>
        </span>
      </div>
    </div>
    <div v-if="currentList.length == 0">
      <span class="empty-mini">Your Cart Looks a Little Empty</span>
    </div>
    <div class="col-md-12 bottom-checkout" v-if="currentList.length > 0">
      <span class="mini-vat">VAT Charge (12%)</span>
      <button
        class="btn btn-default btn-cart-final"
        @click="navigateToCart()"
      >Checkout Rs {{ totalPrice().toFixed(2) }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Helper } from '@/helper/Helper'
import { mapState, mapGetters, mapActions } from 'vuex'

@Component({
  name: 'mini-shopping-cart'
})
export default class MiniShoppingComponent extends Vue {
  currentlySelected: number = 0;
  currentList: any[] = [];

  public created () {
    this.currentList = this.$store.getters[ 'stock/getAllCurrentlySelectedStock' ]
    this.currentlySelected = this.currentList.length

    // update mini cart status due to new purchasable items
    Helper.getNotifier().subscribe(res => {
      if (res) {
        this.refresh()
      }
    })
  }

  decreaseCount (item: any) {
    let amount = item.quantity
    amount == 0 ? '' : amount--
    // remove item quantty from cart
    if (amount > 0) {
      this.$store
        .dispatch('stock/removeOneFromCount', { item: item, qty: amount })
        .then(res => {
          this.refresh()
        })
    }
  }

  increaseCount (item: any) {
    let amount = item.quantity
    amount < 11 ? amount++ : (amount = 10)
    // limit maximum purchase amount to 10 whereas, increase stock if value lesser than 10
    if (amount < 11) {
      this.$store
        .dispatch('stock/addOneToCount', { item: item, qty: amount })
        .then(res => {
          this.refresh()
        })
    }
  }

  // remove current item from cart
  removeFromList (item: any) {
    this.$store.dispatch('stock/removeFromCart', item).then(res => {
      this.refresh()
    })
  }

  refresh () {
    this.currentList = []
    // to re-render new array
    this.currentList = this.$store.getters[ 'stock/getAllCurrentlySelectedStock' ]
    this.currentlySelected = this.currentList.length
  }

  totalPrice () {
    let sum = 0
    this.currentList.forEach(element => {
      sum = sum + +element.price * +element.quantity
    })
    return sum
  }

  navigateToCart () {
    this.$router.push({ name: 'order-summary' })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mini-shopping-cart-a {
  width: 55px;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px #5c5c5c solid;
  font-size: 16px;
  color: #4d4d4d;
  border-radius: 100px;
  display: inline-block;
  min-width: 45px;
  height: 35px;
  margin-left: 10px;
  margin-top: 5px;
  text-align: center;
  vertical-align: middle;
  padding-top: 7px;
  font-weight: 600;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  opacity: 0.8;
  cursor: pointer;
}
.mini-count-label {
  background-color: rgb(229, 229, 229);
  font-weight: normal;
  margin-top: -3px;
  font-size: 12px;
  width: 20px;
  height: 20px;
  padding-top: 2px;
  margin-left: -2px;
  border-radius: 50px;
  color: white;
  position: relative;
  top: -37px;
  right: -12px;
}
.mini-end-allign {
  text-align: end;
  display: flex;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}
.active-mini {
  background-color: red;
}
.deactive-mini {
  background-color: rgb(229, 229, 229);
}
.example-spacer {
  flex: 1 1 auto;
}
.display-flex {
  display: flex;
}
.mini-allign-left {
  text-align: left;
}
.size-13 {
  font-size: 13px;
}
.size-10 {
  font-size: 12px;
}
.title {
  color: #4d4d4d;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
}
.cart-item {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.bottom-checkout {
  position: absolute;
  bottom: 0px;
  width: 97%;
  display: inline-grid;
  margin-bottom: 5px;
}
.btn-cart-final {
  background: linear-gradient(90deg, #41b782, #86d169);
  color: white;
}
.mini-vat {
  font-size: 12px;
  text-align: end;
}
.line-icon-button {
	background: white;
	border-color: white;
	box-shadow: none;
	border: 0px solid white;
	position: relative;
	top: 5px;
}
.line-icon-button:hover {
	cursor: pointer;
}
.size-21 {
	font-size: 21px !important;
	font-weight: 100;
	color: #04854e;
}
.pos-5 {
	position: relative;
	left: -5px;
}
.pos-10 {
	position: relative;
	left: -10px;
}
.pos-15 {
	position: relative;
	left: -15px;
}
.empty-mini {
	font-size: 13px;
	padding-left: 10px;
}
.red-icon {
	color: #921c22;
}
.scroll {
	overflow-y: scroll;
	max-height: 560px;
}
#style-mini-scroller::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
#style-mini-scroller::-webkit-scrollbar {
  width: 0px;
  background-color: #f5f5f5;
}
#style-mini-scroller::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
</style>
