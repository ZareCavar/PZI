<template>
    <div class="login-section">
        <p>Already have an account?</p>
        <button @click="goToLogin">Login</button>
    </div>
</template>
<script setup>
import {useRouter} from '#app';
    const router=useRouter();
    const goToLogin=()=>{
        router.push('/login');
    };
</script>
<style scoped>
.login-section {
    text-align: center;
    margin-bottom: 2rem;
}
button{
    padding: 0.5rem 1rem;
    font-size:1rem;
    cursor: pointer;
}
</style>