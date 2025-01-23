<template>
  <div class="home">
<WelcomeMessage />
<LoginButton />
<RegisterPrompt />
  </div>
</template>
<script setup>
import WelcomeMessage from '../components/WelcomeMessage.vue';
import LoginButton from '../components/LoginButton.vue';
import RegisterPrompt from '../components/RegisterPrompt.vue';

</script>
 <style scoped>
.home{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f9f9f9;
}
</style>