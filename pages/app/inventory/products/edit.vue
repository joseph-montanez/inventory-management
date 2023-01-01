<script setup lang="ts">

import {Product, db} from "~/db";
import { v4 as uuidv4 } from 'uuid';
import useMenuData from "~/composables/menu";

const router = useRouter();
const route = useRoute();
const menu = useMenuData();

menu.setMenuData({...menu.menuData.value,
  primaryKey: 'inventory',
  primarySelectedKeys: ['inventory'],
  secondaryKey: 'products',
  secondarySelectedKeys: ['products'],
  trinaryKey: 'add product',
});

const id = ref(route.query.id ? route.query.id : '');

const photoBox = ref(null);

const layout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19},
};

const activeTabKey = ref('1');

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  product: {
    id: '',
    name: '',
    description: '',
    sku: '',
    isStockManaged: false,
    stock: 0,
    allowBackOrders: false,
    lowStockThreshold: 0,
    isSoldIndividually: false,
    weight: 0,
    weightUnit: 'lbs',
    isEnvelope: false,
    declaredValue: 0,
    shippingClass: '',
    hasPerProductShipping: false,
  },
  user: {
    name: '',
    age: undefined,
    email: '',
    website: '',
    introduction: '',
  },
});

const onFinish = async (values: any) => {
  const product = formState.product as Product;

  console.log(product);

  let newProduct = product.id === '';
  if (newProduct) {
    product.id = uuidv4();
    id.value = product.id;
  }

  try {
    // if (newProduct) {
      const productId = await db.products.put(toRaw(product));
      // console.log('Success Add:', values, productId, product);
    // } else {
    //   const productId = await db.products.update(toRaw(product), {id: unref(id)});
      console.log('Success Update:', values, productId, product);
    // }
  } catch (e) {
    alert('Unable to save');
    throw e;
  }
};

const dragEnter = ref(false);

onMounted(() => {
  let photoBoxElem = unref(photoBox).$el;

  photoBoxElem.addEventListener('dragover', (e) => {
    // Prevent navigation.
    e.preventDefault();
    dragEnter.value = true;
  });

  photoBoxElem.addEventListener('dragleave', (e) => {
    // Prevent navigation.
    e.preventDefault();
    dragEnter.value = false;
  });

  photoBoxElem.addEventListener('dragend', (e) => {
    // Prevent navigation.
    e.preventDefault();
    dragEnter.value = false;
  });

  photoBoxElem.addEventListener('drop', async (e) => {
    e.preventDefault();

    dragEnter.value = false;

    const fileHandlesPromises = [...e.dataTransfer.items]
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFileSystemHandle());

    for await (const handle of fileHandlesPromises) {
      if (handle.kind === 'directory') {
        console.log(`Directory: ${handle.name}`);
      } else {
        console.log(`File: ${handle.name}`);
      }
    }
  });
})
</script>
<template>
  <a-typography-title>
    <span v-if="!id">Add</span>
    <span v-else>Edit</span>
    Product
  </a-typography-title>

  <a-tabs v-model:activeKey="activeTabKey">
    <a-tab-pane key="1" tab="General">General</a-tab-pane>
    <a-tab-pane key="2" tab="Inventory" force-render>Inventory</a-tab-pane>
    <a-tab-pane key="3" tab="Shipping">Shipping</a-tab-pane>
    <a-tab-pane key="3" tab="Attributes">Attributes</a-tab-pane>
    <a-tab-pane key="3" tab="Variations">Variations</a-tab-pane>
  </a-tabs>

  <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
  >

    <a-row>
      <a-col :xs="{span: 24}" :xl="{span: 12}">
        <div class="left-form">
          <a-form-item :name="['product', 'name']" label="Name" :rules="[{ required: true }]"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <a-input v-model:value="formState.product.name"/>
          </a-form-item>
          <a-form-item :name="['product', 'description']"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <template v-slot:label>
              <a-typography-text :ellipsis="true" content="Description" />
            </template>
            <a-textarea v-model:value="formState.product.description"/>
          </a-form-item>
          <!--  :rules="[{ type: 'email' }]" -->
          <a-form-item :name="['product', 'sku']" label="SKU"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <a-input v-model:value="formState.product.sku"/>
          </a-form-item>
          <a-form-item :name="['product', 'isStockManaged']"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <template v-slot:label>
              <a-typography-text :ellipsis="true" content="Managed Stock" />
            </template>
            <a-switch v-model:checked="formState.product.isStockManaged" />
          </a-form-item>
          <a-form-item :name="['product', 'stock']" label="Stock" :rules="[{ type: 'number', min: 0, max: 99999 }]"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <a-input v-model:value="formState.product.stock"/>
          </a-form-item>

          <a-form-item :name="['product', 'allowBackOrders']"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <template v-slot:label>
              <a-typography-text :ellipsis="true" content="Allow Backorder" />
            </template>
            <a-switch v-model:checked="formState.product.allowBackOrders" />
          </a-form-item>

          <a-form-item :name="['product', 'lowStockThreshold']" :rules="[{ type: 'number', min: 0, max: 99999 }]"
                       :label-col="{span: layout.labelCol.span}" :wrapper-col="{span: layout.wrapperCol.span}">
            <template v-slot:label>
              <a-typography-text :ellipsis="true" content="Low Stock Threshold" />
            </template>
            <a-input v-model:value="formState.product.lowStockThreshold"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </div>
      </a-col>
      <a-col :xs="{span: 24}" :xl="{span: 12}" ref="photoBox" class="photo-box" :class="{'drag-enter': dragEnter}">
        Photos Here
      </a-col>
    </a-row>
  </a-form>
</template>
<style scoped>
.left-form {
  padding: 0 1.5rem;
}
.photo-box {
  min-height: 400px;
  border: 1px solid white;
}
.photo-box.drag-enter {
  border: 1px solid blue;
  background: #8cc8ff;
}
</style>
