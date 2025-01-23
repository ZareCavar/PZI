<template>
    <div class="singup">
        <h1>Sign up</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" placeholder="Enter your username" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your Email"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your Password"/>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>
<script setup>
    import {ref} from 'vue';
    const username=ref('');
    const email=ref ('');
    const password=ref('');
    
    const handleSubmit=()=>{
        console.log('Form submitted:',{username:username.value,email:email.value,password:password.value});
        //Ovdje ide logika za registraciju
    };
</script>
<style scoped>
    .signup{
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h1{
        margin-bottom: 1.5rem;
    }
    .form-group{
        margin-bottom: 1.5rem;
        text-align: left;
    }
    label{
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    input{
        width: 100%;
        padding:0.5rem;
        font-size: 1rem;
        border:1px solid #ccc;
        border-radius:4px;
        cursor:pointer;
    }
    button{
        padding:0.75rem 1.5rem;
        font-size:1rem;
        color:#fff;
        background-color:#007bff;
        border:none;
        border-radius:4px;
        cursor:pointer;
}
button:hover{
    background-color:#0056b3;
}
</style>