<template>
  <div className="flex w-full justify-between py-4">
    <div className="text-[26px]">
      <span> Add Profil</span>
    </div>
    <div className="flex mb-8 mt-2">
      <vt-button className="bg-[var(--app-base-color)] rounded-md active:bg-[var(--app-second-color)] text-white"
        @click="$router.go(-1)">
        <div className="flex">
          <v-icon name="fa-chevron-left" className="text-white mt-[1px] mr-2" />
          Retour
        </div>
      </vt-button>
    </div>
  </div>
  <div className="flex w-full">
    <div className="md:w-1/2 xl:w-5/12">
      <div className="flex justify-center w-full flex-col px-8">
        <div className="flex justify-center">
          <div className="flex w-[250px] justify-center border px-4 py-4 bg-white">
            <img src="./../../assets/avatar.svg" />
          </div>
        </div>
        <div className="flex mt-6 justify-center">
          <v-icon name="fa-camera" width="30" height="30" className="cursor-pointer"></v-icon>
        </div>
        <div className="px-8 bg-white mt-4 py-4">
          <div className="mb-4">
            <vt-input placeholder="Website">
              <template v-slot:addon>
                <v-icon name="fa-linkedin" className="mt-[1px] mr-2" />
              </template>
            </vt-input>
          </div>
          <div className="mb-4">
            <vt-input placeholder="Linkedin"></vt-input>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-1/2 xl:w-7/12 bg-white p-8">
      <form auto-complete="off">
        <div className="py-4 flex flex-start">
          <h3>Profil</h3>
        </div>
        <div className="mb-4">
          <vt-input label="Name" placeholder="Name"></vt-input>
        </div>
        <div className="mb-4">
          <vt-input label="Lastname" placeholder="Lastname"></vt-input>
        </div>
        <div className="mb-4">
          <vt-input label="Email" placeholder="Email"></vt-input>
        </div>
        <div className="mb-4">
          <vt-input label="Phone" placeholder="Phone"></vt-input>
        </div>
        <div className="mb-4">
          <vt-input label="Address" placeholder="Address"></vt-input>
        </div>
      </form>
      <div className="w-full mt-8 flex justify-end">
        <vt-button className="bg-[var(--app-base-color)] rounded-md active:bg-[var(--app-second-color)] text-white"
          @click="$router.go(-1)">
          <div className="flex">
            <v-icon name="fa-save" className="text-white mt-[1px] mr-2" />
            Enregister
          </div>
        </vt-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
