<template>
  <nuxt-link
    to="#"
    class="flex items-center w-min p-3 text-black rounded-full hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="h-10 w-10 text-dark">
      <slot name="icon"></slot>
    </div>
    <div class="ml-4 text-xl hidden xl:block" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </nuxt-link>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>
