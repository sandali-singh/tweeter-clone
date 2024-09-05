<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- <div v-if="isAuthLoading">
        <LoadingPage></LoadingPage>
      </div> -->

      <LoadingPage v-if="isAuthLoading" />
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left Sidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0"><SidebarLeft /></div>
          </div>
          <!-- Main Content -->
          <main class="col-span-12 bg-blue-100 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right Sidebar -->
          <div class="hidden col-span-12 md:block md:col-span-4 xl:col-span-4">
            <div class="sticky top-0"><SidebarRight /></div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const darkMode = ref(false);
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const isAuthLoading = useAuthLoading();
// // const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()
const user = useAuthUser();

onBeforeMount(() => {
  initAuth();
});
</script>
