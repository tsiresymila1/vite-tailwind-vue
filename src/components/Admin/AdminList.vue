<template>
  <div>
    <div
      className="flex justify-between bg-[rgba(180,182,189,0.2)] py-8 px-6 rounded-md"
    >
      <vt-select
        focusclass="border-[var(--app-base-color)]"
        id="type"
        label="Select Project"
        containerclass="md:w-1/2 xl:w-4/12 rounded-md"
        v-model="index"
      >
        <template v-slot:addon
          ><v-icon name="fa-briefcase" class="mt-1"></v-icon
        ></template>
        <template v-for="(p, index) in projects">
          <option :value="index" className="custom-option">
            <span className="py-2 px-2">{{ p.name }}</span>
          </option>
        </template>
      </vt-select>
      <!-- <vt-input
        auto-complete="do-not-autofill"
        class="placeholder:text-[var(--app-second-color)] bg-transparent"
        focusclass="border-[var(--app-base-color)]"
        containerclass="md:w-1/2 xl:w-4/12 rounded-md"
        id="email"
        type="text"
        placeholder="Search"
        border="border border-[var(--app-base-color)]"
      >
        <template v-slot:addon
          ><v-icon class="text-[var(--app-second-color)]" name="fa-search"
        /></template>
      </vt-input> -->
      <!-- <div class="md:w-1/2 xl:w-4/12 text-end">
        <vt-button
          class="bg-[var(--app-base-color)] rounded-md active:bg-[var(--app-second-color)] text-white"
          @click="go_to_add()"
        >
          <div class="flex">
            <v-icon name="fa-plus" class="text-white mt-[1px] mr-2" />
            Ajouter
          </div>
        </vt-button>
      </div> -->
    </div>
    <div className="flex mb-4 overflow-y-hidden mt-8 flex-col">
      <table
        className="border-slate-400 w-full text-start table-fixed h-[60px]"
      >
        <thead>
          <tr>
            <th :className="table_header">Id</th>
            <th :className="table_header">Room</th>
            <th :className="table_header">Event</th>
            <th :className="table_header">Socket</th>
            <th :className="table_header">Timestamp</th>
            <th :className="table_header"></th>
          </tr>
        </thead>
      </table>
      <RecycleScroller
        v-if="projects.length > index"
        class="p-relative"
        listClass="w-100 max-h-[640px] overflow-y-scroll w-[100%]"
        itemClass="relative"
        :items="projects[index].events"
        :item-size="20"
        :minItemSize="20"
        key-field="id"
        v-slot="{ item, index }"
      >
        <div
          :key="JSON.stringify(item)"
          className="flex w-[100%]  h-[50px] border-b-[1px] border-[#193779ae]"
        >
          <div :className="table_col">{{ item.id }}</div>
          <div :className="`${table_col} `">
            {{ item.room }}
          </div>
          <div :className="table_col">
            <span
              className="rounded-3xl border-[1px] px-4 py-2 border-[#13a4b8] text-[#13a4b8] hover:bg-[#13a4b8] hover:text-white cursor-pointer"
              >{{ item.name }}</span
            >
          </div>
          <div :className="table_col">{{ item.socket_id }}</div>
          <div :className="table_col">{{ item.created_at }}</div>
          <div :className="table_col">
            <div className="flex space-x-2 justify-center">
              <vt-button :className="btn_class">
                <v-icon name="fa-eye"></v-icon>
              </vt-button>
              <vt-button :className="btn_class">
                <v-icon name="fa-edit"></v-icon>
              </vt-button>
              <vt-button :className="btn_class">
                <v-icon name="fa-trash"></v-icon>
              </vt-button>
            </div>
          </div>
        </div>
      </RecycleScroller>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { axiosBase } from "../../axiosBase";
import ListItem from "./ListItem.vue";

export default defineComponent({
  data() {
    return {
      btn_class:
        "hover:text-white text-[var(--app-base-color)]  hover:bg-[var(--app-base-color)] rounded-none border border-[var(--app-base-color)]",
      table_col: "w-[100%] pt-2",
      table_header:
        "border-b-[1px] text-white border-[#193779ae] bg-[var(--app-base-color)] py-[1rem] pl-6 text-start",
      projects: [] as any[],
      index: 0,
      itemComponent: ListItem,
    };
  },
  mounted() {
    this.loadEvents();
  },
  methods: {
    go_to_add: function () {
      this.$router.push({ name: "add_admin" });
    },
    loadEvents: function () {
      axiosBase.get("/projects/events").then((resp) => {
        console.log("Projects>>", resp.data);
        this.projects = resp.data.projects;
      });
    },
  },
  sockets: {
    event: function (data) {
      console.log("Dat >>>", data);
      this.loadEvents();
    },
  },
});
</script>
<style scoped>
.p-relative {
  position: relative !important;
}
.vue-recycle-scroller.ready .vue-recycle-scroller__item-view {
  position: relative !important;
}
</style>
