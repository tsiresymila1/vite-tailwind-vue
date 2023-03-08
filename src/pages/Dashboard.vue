<template>
  <Modal :show="showModal && selectedProject !== null" :on-close="onCloseModal">
    <template v-slot:header>
      <div
        className="bg-[var(--app-base-color)] w-full flex py-3 px-3 rounded-t-md"
      >
        Project {{ selectedProject?.name }}
      </div>
    </template>
    <div className="flex flex-col gap-y-2 pl-4 pr-8 py-4">
      <div className="flex flex-row">
        <div className="min-w-[60px]">Name:</div>
        <div className="flex-auto font-bold">
          {{ selectedProject?.name }}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="min-w-[60px]">API KEY:</div>
        <div className="flex-auto">
          {{ selectedProject?.api_key }}
        </div>
        <div className="pl-2 justify-end">
          <v-icon
            name="fa-copy"
            width="30"
            @click="copyToClipBoard()"
            height="30"
            color="green"
            class="cursor-pointer"
          ></v-icon>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-[60px] justify-start">ROOM:</div>
        <div className="flex-auto">
          {{ selectedProject?.room }}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="min-w-[60px] justify-start">Callback URL:</div>
        <div className="flex-auto">
          {{ selectedProject?.callback }}
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <!-- content for the header slot -->
      <div className="pr-4 pb-4 relative pt-5">
        <v-button
          class="bg-[var(--app-base-color)] py-2 px-4 text-white rounded-md cursor-pointer"
          @click="onCloseModal()"
        >
          Close
        </v-button>
      </div>
    </template>
  </Modal>
  <Modal :show="showModalAdd" :on-close="onCloseModal">
    <template v-slot:header>
      <div
        className="bg-[var(--app-base-color)] w-full flex py-3 px-3 rounded-t-md"
      >
        New - Project
      </div>
    </template>
    <div className="flex flex-col gap-y-2 pl-4 pr-8 py-4">
      <div className="flex flex-row">
        <vt-input
          autocomplete="off"
          focusclassName="border-[var(--app-base-color)]"
          id="name"
          type="text"
          label="Project Name"
          placeholder="Project Name"
          @change="onNameChange"
          v-model="name"
        >
          <template v-slot:addon
            ><v-icon name="fa-briefcase"></v-icon
          ></template>
        </vt-input>
      </div>
      <div className="flex flex-row">
        <vt-input
          autocomplete="off"
          focusclassName="border-[var(--app-base-color)]"
          id="callback"
          type="text"
          label="Event callback"
          placeholder="Event callback"
          @change="onCallbackChange"
          v-model="callback"
        >
          <template v-slot:addon
            ><v-icon name="fa-briefcase"></v-icon
          ></template>
        </vt-input>
      </div>
    </div>
    <template v-slot:footer>
      <!-- content for the header slot -->
      <div className="pr-4 pb-4 relative pt-5">
        <v-button
          class="bg-[var(--app-base-color)] py-2 px-4 text-white rounded-md cursor-pointer"
          @click="onCloseModal()"
        >
          Close
        </v-button>
      </div>
      <div className="pr-4 pb-4 relative pt-5">
        <v-button
          class="bg-[var(--app-base-color)] py-2 px-4 text-white rounded-md cursor-pointer"
          @click="onAddProject()"
        >
          Ajouter
        </v-button>
      </div>
    </template>
  </Modal>
  <div className="flex flex-col">
    <VtTab>
      <VtTabButton :active="activeIndex === 0" @click="navtab(0)">
        Projects
      </VtTabButton>
      <VtTabButton :active="activeIndex === 1" @click="navtab(1)">
        Working items
      </VtTabButton>
      <VtTabButton :active="activeIndex === 2" @click="navtab(2)">
        Pull request
      </VtTabButton>
    </VtTab>
    <div
      :className="`flex mx-1 my-10 flex-wrap gap-y-5 gap-x-8 justify-start flex-col ${
        activeIndex === 0 ? 'show' : 'hidden'
      }`"
    >
      <div className="md:w-1/2 xl:w-4/12 text-end">
        <vt-button
          class="bg-[var(--app-base-color)] rounded-md active:bg-[var(--app-second-color)] text-white"
          @click="addProject()"
        >
          <div className="flex">
            <v-icon name="fa-plus" class="text-white mt-[1px] mr-2" />
            Ajouter
          </div>
        </vt-button>
      </div>
      <template v-for="p of projects">
        <div className="flex min-w-[120px]">
          <ProjectItem
            :project="p"
            @deleted="onDelete"
            :on-tap-project="showProject"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VtTabButton from "./../components/Dashboard/TabButton.vue";
import VtTab from "./../components/Dashboard/Tab.vue";
import ProjectItem from "./../components/Dashboard/Projet/ProjectItem.vue";
import { axiosBase } from "../axiosBase";
import { Projet } from "../type";
import Modal from "../components/common/Modal.vue";
import { TYPE, useToast } from "vue-toastification";
const toast = useToast();
export default defineComponent({
  components: { VtTabButton, VtTab, ProjectItem, Modal },
  data: () => {
    return {
      activeIndex: 0 as number,
      projects: [] as Projet[],
      showModal: false as boolean,
      showModalAdd: false as boolean,
      selectedProject: null as Projet | null,
      name: "" as string,
      callback: "" as string,
    };
  },
  methods: {
    navtab: function (index: number) {
      this.activeIndex = index;
    },
    onCloseModal: function () {
      this.showModal = false;
      this.showModalAdd = false;
    },
    showProject: function (p: Projet) {
      console.log(p);
      if (p === this.selectedProject) {
        this.showModal = !this.showModal;
      } else {
        this.selectedProject = p;
        this.showModal = true;
      }
    },
    copyToClipBoard: function () {
      navigator.clipboard.writeText(this.selectedProject?.api_key);
      toast("API KEY copied to clipboard", {
        type: TYPE.SUCCESS,
      });
    },
    onDelete: function (e) {
      console.log("Deleted >>>", e);
      this.projects = this.projects.filter((p) => p.id !== e.id);
    },
    addProject: function () {
      this.showModalAdd = true;
    },
    onAddProject: function () {
      console.log(this.name, this.callback);
      axiosBase
        .post("/projects/create", { name: this.name, callback: this.callback })
        .then(() => {
          toast.success("Project added with success");
          this.showModalAdd = false;
          this.getProject();
          this.name = "";
          this.callback = "";
        })
        .catch((e) => {
          toast.error("Error on createing project");
        });
    },
    onNameChange: function (e: any) {
      this.name = e.target.value;
    },
    onCallbackChange: function (e: any) {
      this.callback = e.target.value;
    },
    getProject: function () {
      axiosBase.get("/projects").then((res) => {
        console.log("res project >>>>", res);
        if (res.data && res.data.projects) {
          this.projects = res.data.projects;
        }
      });
    },
  },
  mounted() {
    this.getProject();
  },
});
</script>
