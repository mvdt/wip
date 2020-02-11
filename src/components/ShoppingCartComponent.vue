<template>
  <div class="row height-fix">
    <div class="col-md-9 height-inherit">
      <b-card id="style-2">
        <div class="row">
          <div class="col-md-12 flex">
            <h3 class="allign-left">Your Order</h3>
            <span class="example-spacer"></span>
            <i class="material-icons pos-15">arrow_back</i>
            <router-link class="pos-left" to="/products/all" rel="prev">Back To product List</router-link>
            <hr>
          </div>
          <div class="col-md-12" v-if="currentList.length > 0">
            <table class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style="width:50%" class="text-left">Item</th>
                  <th style="width:10%" class="text-right">Price (Rs.)</th>
                  <th style="width:15%" class="text-center">Quantity</th>
                  <th style="width:15%" class="text-right">Subtotal (Rs.)</th>
                  <th style="width:10%" class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in currentList" :key="item.id">
                  <td data-th="Item" class="allign-left">
                    <div class="row">
                      <div class="col-sm-9">
                        <h4>{{ item.name }}}</h4>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price" class="price">{{ item.price.toFixed(2) }}</td>
                  <td data-th="Quantity">
                    <div class="row qty-actions">
                      <span @click="decreaseCount(item)" class="line-icon-button pos-15">
                        <i class="material-icons size-21">remove_circle_outline</i>
                      </span>
                      <label>{{ item.quantity }}</label>
                      <span @click="increaseCount(item)" class="line-icon-button pos-5">
                        <i class="material-icons size-21">add_circle_outline</i>
                      </span>
                    </div>
                  </td>
                  <td data-th="Subtotal" class="sub-total allign-end">{{ (item.price * item.quantity).toFixed(2) }}</td>

                  <td class="actions" data-th>
                    <div class="row btn-actions">
                      <span @click="removeFromList(item)" class="line-icon-button">
                        <i class="material-icons size-21 red-icon">delete</i>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="hidden-xs">
                  <td colspan="3" class="text-right">Sub Total</td>
                  <td colspan="1" class="hidden-xs text-right">
                    <h5>
                      <strong>Rs. {{ totalPrice().toFixed(2) }}</strong>
                    </h5>
                  </td>
                  <td></td>
                </tr>
                <tr class="hidden-xs">
                  <td colspan="3" class="text-right">Discount Amount</td>
                  <td colspan="1" class="hidden-xs text-right">
                    <h5>
                      <strong>Rs. {{ discountPrice().toFixed(2) }}</strong>
                    </h5>
                  </td>
                  <td></td>
                </tr>
                <tr class="hidden-xs">
                  <td colspan="3" class="text-right">VAT Charge</td>
                  <td colspan="1" class="hidden-xs text-right">
                    <h5>
                      <strong>Rs. {{ totalServiceCharge().toFixed(2) }}</strong>
                    </h5>
                  </td>
                  <td></td>
                </tr>

                <tr class="hidden-xs active">
                  <td colspan="3" class="text-right">
                    <strong>Total Amount</strong>
                  </td>
                  <td colspan="1" class="hidden-xs text-right">
                    <h4>
                      <strong>Rs. {{ ((+this.totalPrice().toFixed(2) - +this.discountPrice().toFixed(2)) + +totalServiceCharge().toFixed(2)).toFixed(2) }}</strong>
                    </h4>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="col-md-12" v-if="currentList.length == 0">
            <span class="no-cart-label">No items in your cart</span><br>
            <span>Your cart looks little empty. Why not checkout some of our products</span><br>
            <button
              class="btn btn-default btn-cart-final padding-up"
              @click="navigateToProducts()"
            >Continue Shopping</button>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-md-3 width-fix">
      <b-card class="no-overflow">
        <div class="row">
          <div class="col-md-12">
            <h3 class="allign-left">Order Summary</h3>
            <hr>
          </div>
          <div class="col-md-12 display-flex">
            <span>Sub total</span>
            <span class="example-spacer"></span>
            <span>{{ totalPrice().toFixed(2) }}</span>
          </div>
          <div class="col-md-12 display-flex">
            <span>Discount Amount</span>
            <span class="example-spacer"></span>
            <span>{{ discountPrice().toFixed(2) }}</span>
          </div>
          <div class="col-md-12 display-flex">
            <span>Discounted Total</span>
            <span class="example-spacer"></span>
            <span>{{ +totalPrice().toFixed(2) - +discountPrice().toFixed(2) }}</span>
          </div>
          <div class="col-md-12 display-flex">
            <span>Total VAT</span>
            <span class="example-spacer"></span>
            <span>{{ totalServiceCharge().toFixed(2) }}</span>
          </div>
        </div>
        <div class="col-md-12 bottom-checkout-label" v-if="currentList.length > 0">
          <span class="cart-label">Net Total</span>
          <span class="cart-label font-32">Rs. {{ ((+this.totalPrice().toFixed(2) - +this.discountPrice().toFixed(2)) + +totalServiceCharge().toFixed(2)).toFixed(2) }}</span>
        </div>
        <div class="col-md-12 bottom-checkout" v-if="currentList.length > 0">
          <button
            class="btn btn-default btn-cart-final"
            @click="navigateToCart()"
          >Proceed to Checkout</button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Helper } from '@/helper/Helper'

@Component({
  name: 'Shopping-cart'
})
export default class ShoppingCartComponent extends Vue {
  currentList: any[] = [];

  public created () {
    this.currentList = this.$store.getters['stock/getAllCurrentlySelectedStock']
  }

  // get total sum on cart
  totalPrice () {
    return this.currentList.reduce((acc, curr) => acc + (+curr.price * +curr.quantity))
  }

  // get discount price
  discountPrice () {
    let sum = 0
    this.currentList.forEach(element => {
      if (+element.price > 500) {
        sum = sum + (+element.price)
      }
    })
    if (sum > 0) {
      let factor = Math.floor(sum / 500)
      let discountPrice = sum * (+factor / 100)
      sum = discountPrice
    }
    return sum
  }

  // get total VAT
  totalServiceCharge () {
    let vat = 0
    vat = (+this.totalPrice() - +this.discountPrice()) * (12 / 100)
    return vat
  }

  // navigate back to product list view
  navigateToProducts () {
    this.$router.push({ name: 'products' })
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
    this.currentList = this.$store.getters[
      'stock/getAllCurrentlySelectedStock'
    ]
  }

  navigateToCart () {
    // show purchase successful
    this.$bvToast.toast(`Total Payable Amount ${((+this.totalPrice().toFixed(2) - +this.discountPrice().toFixed(2)) + +this.totalServiceCharge().toFixed(2)).toFixed(2)}`, {
      title: 'Purchase Order',
      autoHideDelay: 5000,
      appendToast: true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  height: 95vh;
  padding-top: 0px !important;
  overflow-y: scroll;
}
.card-body {
  padding-top: 13px !important;
}
.height-fix {
  height: 96vh;
}
.height-inherit {
  height: inherit;
}
.width-fix {
  padding-left: 0px;
  margin-left: -10px;
}
.no-overflow {
  overflow: hidden;
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
.allign-left {
  text-align: left;
}
.example-spacer {
  flex: 1 1 auto;
}

.display-flex {
  display: flex;
  padding-top: 15px;
  font-size: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.bottom-checkout {
  position: absolute;
  bottom: 0px;
  width: 88%;
  display: grid;
  margin-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
}
.bottom-checkout-label {
  position: absolute;
  bottom: 40px;
  width: 88%;
  display: grid;
  margin-bottom: 5px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: end;
}
.cart-label {
  font-size: 26px !important;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: #e5e5e5 1px solid;
}
.font-32 {
  font-size: 32px !important;
}
.btn-cart-final {
  background: linear-gradient(90deg, #41b782, #86d169);
  color: white;
}
// table css
.table th {
  padding: 0.55rem;
}
tr h4, h5 {
  font-size: 1rem;
}
thead {
  background-color: #e5e5e5;
}
thead th {
  font-weight: 400;
}
.padding-up {
  margin-top: 20px;
}
.no-cart-label {
  font-weight: 700;
  font-size: 24px;
}

.allign-end {
  text-align: end;
}
.qty-actions {
  text-align: end;
  display: inline-flex;
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
  left: 15px;
  top: 2px;
}
.pos-10 {
  position: relative;
  left: -10px;
}
.pos-15 {
  position: relative;
  left: -15px;
  top: 2px;
}
.red-icon {
  color: #921c22;
}
.flex {
  display: flex;
}
.pos-left:hover {
  text-decoration: none;
}
.actions {
  display: -webkit-inline-box;
  text-align: center;
}
</style>
