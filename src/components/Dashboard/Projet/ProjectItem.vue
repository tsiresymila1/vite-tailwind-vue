<template>
  <div
    @click="$props.onTapProject!($props.project)"
    class="flex shadow-md px-4 py-5 flex-col sm:w-[10vw] min-w-[120px] min-h-[80px] cursor-pointer rounded-sm"
  >
    <div class="flex justify-between">
      <div>
        {{ $props.project.name }}
      </div>
      <div class="relative" @click="(e) => e.stopPropagation()">
        <vt-dropdown
          class="z-0"
          :data_target="`#dropOption${$props.project.id}`"
        >
          <v-icon class="ml-2" name="fa-ellipsis-v"></v-icon>
        </vt-dropdown>
        <div
          :id="`dropOption${$props.project.id}`"
          class="hidden rounded-md shadow-lg px-2 py-2 absolute z-50 bg-[#ffffffb4]"
        >
          <vt-button class="dropdown-item" @click="deleteProject()"
            >Delete</vt-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props extends ButtonHTMLAttributes {
  project: Projet;
  onTapProject?: (p: Projet) => void;
}
defineProps<Props>();
defineEmits<{ deleted: (p: Projet) => void }>();
</script>
<script lang="ts">
import { ButtonHTMLAttributes, defineComponent } from "vue";
import { Projet } from "../../../type";
import { axiosBase } from "../../../axiosBase";
export default defineComponent({
  data: () => {
    return {};
  },
  methods: {
    deleteProject: function () {
      axiosBase
        .delete(`/projects/${this.$props.project.id}/delete`)
        .then(() => {
          this.$emit("deleted", this.$props.project);
        });
    },
  },
});
</script>
