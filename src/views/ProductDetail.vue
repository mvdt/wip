<template>
  <div class="row height-fix">
    <div class="col-md-9 height-inherit">
      <b-card class="no-overflow">
        <ProductDetailComponent/>
      </b-card>
    </div>
    <div class="col-md-3 width-fix">
      <b-card class="no-overflow">
        <MiniShoppingCartComponent/>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductDetailComponent from '@/components/ProductDetailComponent.vue'
import MiniShoppingCartComponent from '@/components/MiniShoppingCartComponent.vue'

@Component({
  name: 'Product-Detail',
  components: {
    ProductDetailComponent,
    MiniShoppingCartComponent
  }
})
export default class ProductDetail extends Vue {}
</script>
<style lang="scss" scoped>
.card {
  height: 95vh;
	padding-top: 0px !important;
  overflow-y: scroll;
}
.card-body {
	padding-top: 0px !important;
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
</style>
