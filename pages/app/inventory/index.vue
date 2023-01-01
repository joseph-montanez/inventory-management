<script setup lang="ts">
import useMenuData from "~/composables/menu";

definePageMeta({
  layout: 'default',
});

const menu = useMenuData();

menu.setMenuData({...menu.menuData.value,
  primaryKey: 'inventory',
  primarySelectedKeys: ['inventory'],
  secondaryKey: '',
  secondarySelectedKeys: [],
  trinaryKey: '',
  trinarySelectedKeys: [],
});

</script>
<template>
Inventory Dashboard Here!
</template>
