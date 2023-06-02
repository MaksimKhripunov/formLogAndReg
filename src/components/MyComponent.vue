<template>
 <div class="root">
   <div class="signin">
   <form action="#" @submit.prevent="checkFormSignIn" method="post">
     <h1>Sign In</h1>
     <div class="container">
       <div class="input-box">
         <label for="email"><b>Email</b></label><span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
         <input name="email" type="email" placeholder="Enter Email" v-model.trim="formSignIn.email" required>
       </div>
       <div class="input-box">
         <label for="password"><b>Password</b></label><span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
         <input name="password" type="password" placeholder="Enter Password" v-model.trim="formSignIn.password" required>
       </div>
       <p id="failedLogin"></p>
       <button type="submit" class="btn">Sign in</button>
       <div class="register">
         <a href="#" class="register" v-on:click="toSignUp">Sign up</a>
       </div>
       </div>
     </form>
   </div>

   <div class="signup">
     <form action="#" @submit.prevent="checkFormSignUp" method="post">
       <h1>Sign Up</h1>
       <div class="container">
         <div class="input-box">
           <label for="name"><b>Name</b></label><span class="icon"><ion-icon name="person-outline"></ion-icon></span>
           <input name="name" type="text" placeholder="Enter Name"
                  v-model.trim="formSignUp.name"
                  v-on:keypress="noDigits"
                  required>
         </div>
         <div class="input-box">
           <label for="patronymic"><b>Patronymic</b></label><span class="icon"><ion-icon name="person-outline"></ion-icon></span>
           <input name="patronymic" type="text" placeholder="Enter Patronymic"
                  v-model.trim="formSignUp.patronymic"
                  v-on:keypress="noDigits"
                  required>
         </div>
         <div class="input-box">
           <label for="surname"><b>Surname</b></label><span class="icon"><ion-icon name="person-outline"></ion-icon></span>
           <input name="surname" type="text" placeholder="Enter Surname"
                  v-model.trim="formSignUp.surname"
                  v-on:keypress="noDigits"
                  required>
         </div>
         <div class="input-box">
           <label for="email"><b>Email</b></label><span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
           <input name="email" type="email" placeholder="Enter Email" v-model.trim="formSignUp.email" required ref="emailEq">
         </div>
         <div class="input-box">
           <label for="phoneNumber"><b>Phone Number</b></label><span class="icon"><ion-icon name="phone-portrait-outline"></ion-icon></span>
           <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="8-xxx-xxx-xx-xx"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  v-model.trim="formSignUp.phoneNumber" required ref="phoneNumberEq">
         </div>
         <div class="input-box">
           <label for="birthDate"><b>Date of Birth</b></label><span class="icon"><ion-icon name="calendar-clear-outline"></ion-icon></span>
           <input name="birthDate" type="date" placeholder="Enter Date of Birth" v-model.trim="formSignUp.birthDate" required ref="birthDateEq">
         </div>
         <div class="input-box">
           <label for="country"><b>Country</b></label><span class="icon"><ion-icon name="flag-outline"></ion-icon></span>
           <br>
           <select v-model="formSignUp.country" required>
             <option :value="null" disabled>--Select Country--</option>
             <option v-for="(country, key) in countries" :key="key">
               {{ key }}
             </option>
           </select>
         </div>
         <div class="input-box">
           <label for="city"><b>City</b></label><span class="icon"><ion-icon name="business-outline"></ion-icon></span>
           <br>
           <select v-model="formSignUp.city" required :disabled="formSignUp.country==null">
             <option :value="null" disabled>--Select City--</option>
             <option v-for="(city, key) in countries[formSignUp.country]" :key="key">
               {{ city }}
             </option>
           </select>
         </div>
         <div class="input-box">
           <label for="password"><b>Password</b></label><span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
           <input id="password" name="password" type="password" placeholder="Enter Password" v-model.trim="formSignUp.password" required ref="qualityOfPas">
         </div>
         <div class="input-box">
           <label for="repPassword"><b>Repeat Password</b></label><span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
           <input name="repPassword" type="password" placeholder="Repeat Password" v-model.trim="formSignUp.repPassword" required ref="passwordEq">
         </div>
         <button type="submit" class="btn">Sign up</button>
         <div class="login">
           <a href="#" class="login" v-on:click="toSignIn">Sign in</a>
         </div>
       </div>
     </form>
   </div>
 </div>
</template>

<style src="../styles.css"></style>
<script src="../lab3.js"></script>


