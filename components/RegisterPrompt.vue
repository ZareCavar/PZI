<template>
    <div class="register-section">
        <p>New User? Register Here</p>
        <button @click="goToSignUp">Sign Up</button>
   </div>
</template>
<script setup>
import {useRouter} from '#app';
const router=useRouter();
   const goToSignUp=()=>{
    router.push('/signup');
   };

</script>
<style scoped>
.register-section{
    text-align: center;
}
button{
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
}
</style>