<template>
  <nuxt-link to="#" class="flex items-center p-3 text-black w-min hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="w-6 h-6 text-dark">
      <slot name="icon" />
    </div>
    <div class="hidden ml-4 text-xl xl:block"
      :class="textClasses"
    >
      <slot name="name" />
    </div>
  </nuxt-link>
</template>

<script setup>
  const { defaultTransition } = useTailwindConfig();
  const pros = defineProps({
    active: {
      type: Boolean,
      default: false,
    }
  });
  const textClasses = computed(() => pros.active ? 'font-semibold': 'font-normal');
</script>