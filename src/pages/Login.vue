<template>
  <div className="flex h-[100vh] bg-white-100 my-0">
    <div className="m-auto">
      <form auto-complete="off">
        <div className="bg-white shadow-md border border-gray-100 md:w-[28rem] w-[80vw] p-8 rounded-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-center pb-[30px] pt-2">
              <img src="../assets/vue.svg" className="h-[80px] object-contain" alt="logo" />
            </div>
            <div className="flex items-center justify-center py-2">
              <h3 className="text-[var(--app-base-color)] text-2xl font-bold">
                Login
              </h3>
            </div>
            <vt-input autocomplete="off" focusclassName="border-[var(--app-base-color)]" id="email" type="email"
              label="E-mail" placeholder="E-mail" @input="onUsernameChange">
              <template v-slot:addon>
                <v-icon name="fa-envelope"></v-icon>
              </template>
            </vt-input>
            <vt-input autocomplete="off" focusclassName="border-[var(--app-base-color)]" id="password" type="password"
              label="Password" placeholder="Password" @input="onPasswordChange">
              <template v-slot:addon><v-icon name="fa-lock"></v-icon></template>
            </vt-input>
            <!-- <vt-select
              focusclassName="border-[var(--app-base-color)]"
              id="type"
              label="Type"
            >
              <template v-slot:addon><v-icon name="fa-lock"></v-icon></template>
              <option value="Test">Test</option>
              <option value="Test">Test</option>
            </vt-select> -->
            <div className="flex pt-4 pb-2">
              <vt-button :disabled="false" type="button"
                className="w-full bg-[var(--app-base-color)] text-center text-white rounded-none" @click="singin">
                <img v-if="isloading" className="w-[20px] h-[20px] inline" src="../assets/loader.gif" alt="spinner" />
                <span v-else>Login</span>
              </vt-button>
            </div>
            <div className="flex w-full pt-1 pb-2 justify-end ">
              <div className="text-[#acacac]">Dont't have any account ?</div>
              <vt-button :disabled="false" type="button"
                className="bg-transparent text-center text-[var(--app-base-color)] rounded-none py-[2px]"
                @click="singup">
                <span>Register</span>
              </vt-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { axiosBase } from "../axiosBase";
import { useAuth } from "../store/auth";

export default defineComponent({
  setup: () => {
    const auth = useAuth();
    const disabled = ref<boolean>(true);
    const email = ref<string>("");
    const password = ref<string>("");
    return {
      user: computed(() => auth.user),
      login: auth.login,
      logout: auth.logout,
      disabled,
      email,
      password,
    };
  },
  data: () => {
    return {
      isloading: false as boolean,
    };
  },
  methods: {
    onUsernameChange(evt: Event) {
      if (evt.target) this.email = evt.target['value'];
    },
    onPasswordChange(evt: InputEvent) {
      if (evt.target) this.password = evt.target['value'];
      this.disabled = false;
    },
    singin: async function () {
      this.isloading = true;
      axiosBase
        .post(
          "/api/auth/login",
          { email: this.email, password: this.password },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
        )
        .finally(() => {
          this.isloading = false;
        })
        .then((resp) => {
          console.log(resp);
          if (resp.headers) {
            const token = resp.headers["authorization"];
            this.login(token, resp.data);
            console.log("token >>>", token);
            this.$router.push({
              path: "/admin",
            });
          }
        });
    },
    singup: function () {
      this.$router.push({
        name: "register",
      });
    },
  },
});
</script>
