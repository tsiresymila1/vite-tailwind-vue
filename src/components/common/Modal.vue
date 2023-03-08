<template>
  <div
    :className="`fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full modal flex items-center justify-center min-w-md ${
      $props.show ? 'show' : 'hidden'
    }`"
    @click="onClose"
  >
    <div
      @click="onClickModal"
      className="relative mx-auto shadow-xl rounded-md bg-white min-w-[500px]"
    >
      <!-- Modal header -->
      <div
        className="flex justify-between items-center text-white text-xl rounded-t-md"
      >
        <slot name="header"></slot>
      </div>

      <!-- Modal body -->
      <slot></slot>

      <!-- Modal footer -->
      <div className="flex justify-end">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ show: boolean; onClose: () => void }>();
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    onClose: function (e: Event) {
      if (this.$props.onClose) {
        this.$props.onClose();
      }
    },
    onClickModal: function (e: any) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    },
  },
});
</script>
