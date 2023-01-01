<script setup lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShopOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import useMenuData from "~/composables/menu";

const { menuData, setMenuData } = useMenuData();

const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['products1']);
const openKeys = ref<string[]>(['sub1']);

const isInstalled = ref(false);

const goToTopMenuItem = (event) => {
  console.log(event);
  switch (event.key) {
    case "inventory":
      setMenuData({...menuData.value, primaryKey: event.key});
      navigateTo({
        path: '/app/inventory',
      });
      break;
    case "categories":
      navigateTo({
        path: '/app',
      });
      break;
    case "attributes":
      navigateTo({
        path: '/app',
      });
      break;
  }
};

const goToMenuItem = ({key, eventKey}) => {
  switch (key) {
    case "products":
      setMenuData({...menuData.value, secondaryKey: key});
      navigateTo({
        path: '/app/inventory/products',
      });
      break;
    case "categories":
      navigateTo({
        path: '/app',
      });
      break;
    case "attributes":
      navigateTo({
        path: '/app',
      });
      break;
  }
};

onMounted(() => {
  isInstalled.value = localStorage.getItem('installed') ? true : false;
});
</script>
<template>
  <a-layout v-if="isInstalled">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="menuData.primarySelectedKeys"
          v-on:click="goToTopMenuItem"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="shops"><shop-outlined /> Shops</a-menu-item>
        <a-menu-item key="inventory"><table-outlined /> Inventory</a-menu-item>
        <a-menu-item key="settings"><setting-outlined /> Settings</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item><NuxtLink to="/app">Home</NuxtLink></a-breadcrumb-item>
        <a-breadcrumb-item v-if="menuData.primaryKey"><NuxtLink :to="`/app/${menuData.primaryKey}`">{{ menuData.primaryKey.substr(0, 1).toUpperCase() + menuData.primaryKey.substr(1) }}</NuxtLink></a-breadcrumb-item>
        <a-breadcrumb-item v-if="menuData.secondaryKey"><NuxtLink :to="`/app/${menuData.primaryKey}/${menuData.secondaryKey}`">{{ menuData.secondaryKey.substr(0, 1).toUpperCase() + menuData.secondaryKey.substr(1) }}</NuxtLink></a-breadcrumb-item>
        <a-breadcrumb-item v-if="menuData.trinaryKey">{{ menuData.trinaryKey.substr(0, 1).toUpperCase() + menuData.trinaryKey.substr(1) }}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff; height: calc(100% - 3.3rem);">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
              v-model:selectedKeys="menuData.secondarySelectedKeys"
              v-model:openKeys="openKeys"
              v-on:click="goToMenuItem"
              mode="inline"
              style="height: 100%"
          >
            <a-menu-item key="products">
              <template #icon>
                <user-outlined />
              </template>
              Products
            </a-menu-item>
            <a-menu-item key="categories">
              <template #icon>
                <user-outlined />
              </template>
              Categories
            </a-menu-item>
            <a-menu-item key="attributes">
              <template #icon>
                <user-outlined />
              </template>
              Attributes
            </a-menu-item>

          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px', overflowY: 'auto' }">
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Joseph Montañez ©2022
    </a-layout-footer>
  </a-layout>
  <div v-else><slot /></div>
</template>
<style>
html, body, body > div, body > div > section.ant-layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
