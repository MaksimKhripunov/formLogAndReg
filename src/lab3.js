import { useVuelidate } from '@vuelidate/core';
import { required, email} from '@vuelidate/validators';
import countriesData from './countries.json';
import {query, collection, getDocs, orderBy, addDoc} from 'firebase/firestore'
import {db} from './main.js'




export default {
    name: 'MyComponent',
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return{
            formSignIn:{
                email: null,
                password: null
            },
            formSignUp:{
                email:null,
                password: null,
                repPassword: null,
                birthDate: null,
                name: null,
                surname: null,
                patronymic: null,
                phoneNumber: null,
                city: null,
                country: null
            },
            countries: countriesData,
            users: []
        }
    },
    created() {
        console.log("AAAAAAAAAAAAAAA");
        this.getUsers();
    },
    validations () {
        return {
            formSignIn: {
                email: { required, email },
            },
            formSignUp: {
                email: { required, email },
            }

        }
    },
    methods: {
        toSignIn(){
            document.querySelector('.root').classList.remove('active');
        },
        toSignUp(){
            document.querySelector('.root').classList.add('active');
        },
        checkFormSignIn(){
            this.v$.formSignIn.$touch();
            if(!this.v$.formSignIn.$error && this.searchUser()) {
                document.getElementById('failedLogin').innerHTML="";
                console.log('Валидация прошла успешно');
                this.$router.push('home');
            }else{
                let failedLogin=document.getElementById('failedLogin');
                failedLogin.innerHTML=("Incorrect email or password");
                failedLogin.style.color="red";
                console.log('Failed');
            }
        },
        checkFormSignUp(){
            this.v$.formSignUp.$touch();

            if(!this.v$.formSignUp.$error) {
                console.log('Валидация прошла успешно');
                this.createUser(this.formSignUp);
                this.$router.push('home');
            }else{
                console.log('Failed');
            }
        },
        noDigits(event) {
            if ("1234567890".indexOf(event.key) != -1)
                event.preventDefault();
        },
        analyzeString (baseScore)
        {
            let num = {};
            num.Excess = 0;
            num.Upper = 0;
            num.Numbers = 0;
            num.Symbols = 0;
            let bonus = {};
            bonus.Excess = 3;
            bonus.Upper = 4;
            bonus.Numbers = 5;
            bonus.Symbols = 5;
            bonus.Combo = 0;
            bonus.FlatLower = 0;
            bonus.FlatNumber = 0;
            for (let i=0; i<this.formSignUp.password.length;i++)
            {
                if (this.formSignUp.password[i].match(/[A-Z]/g)) {num.Upper++;}
                if (this.formSignUp.password[i].match(/[0-9]/g)) {num.Numbers++;}
                if (this.formSignUp.password[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) {num.Symbols++;}
            }

            if(num.Numbers==0 || num.Upper==0 || num.Symbols==0){
                return 0;
            }

            num.Excess = this.formSignUp.password.length - 8;

            if (num.Upper && num.Numbers && num.Symbols)
            {
                bonus.Combo = 25;
            }
            else if ((num.Upper && num.Numbers) || (num.Upper && num.Symbols) || (num.Numbers && num.Symbols))
            {
                bonus.Combo = 15;
            }

            if (this.formSignUp.password.match(/^[\sa-z]+$/))
            {
                bonus.FlatLower = -15;
            }

            if (this.formSignUp.password.match(/^[\s0-9]+$/))
            {
                bonus.FlatNumber = -35;
            }

            return baseScore + (num.Excess*bonus.Excess) + (num.Upper*bonus.Upper) + (num.Numbers*bonus.Numbers) +
                (num.Symbols*bonus.Symbols) + bonus.Combo + bonus.FlatLower + bonus.FlatNumber;
        },
        async getUsers(){
            const q=query(collection(db,'users'),orderBy('name'));
            const querySnap=await getDocs(q);


            querySnap.forEach((doc)=>{
                console.log(doc.data())
                this.users.push(doc.data());
            })
        },
        searchUser(){
            let flag=false;
            this.users.forEach((user)=>{
                if (user.email == this.formSignIn.email && user.password == this.formSignIn.password)
                    flag=true
            })
            return flag;
        },
        async createUser(dataObj) {
            const colRef = collection(db, 'users');
            await addDoc(colRef, dataObj);
        }
    },
    watch:{

        'formSignUp.birthDate': function (val) {
            const { birthDateEq } = this.$refs;
            let date18YearsAgo=new Date(new Date().getFullYear() - 18, new Date().getMonth(),new Date().getDate());
            if (new Date(val) >= new Date) {
                birthDateEq.setCustomValidity('Некорректная дата рождения');
            }else if(new Date(val) >= date18YearsAgo){
                birthDateEq.setCustomValidity('Вам должно быть больше 18 лет');
            } else {
                birthDateEq.setCustomValidity('');
            }
        },
        'formSignUp.email': function (val) {
            const { emailEq } = this.$refs;
            let flag=false;
            this.users.forEach((user)=>{
                if (user.email == val)
                    flag=true
            })
            if(flag){
                emailEq.setCustomValidity('email занят');
            }else{
            if (val.indexOf('@')!=-1 && val.substr(val.indexOf('@'),  val.length).indexOf('.')==-1) {
                emailEq.setCustomValidity('Некорректный email');
            } else {
                emailEq.setCustomValidity('');
            }
            }
        },
        'formSignUp.password': function (val) {
            const { qualityOfPas } = this.$refs;
            let baseScore=0;
            if (val.length >= 8)
            {
                baseScore=this.analyzeString(50);
                if (baseScore<50) {
                    document.getElementById('password').style.borderColor="red";
                    qualityOfPas.setCustomValidity('Слабый пароль');
                } else if(baseScore >= 50 && baseScore <= 75){
                    document.getElementById('password').style.borderColor="yellow";
                    qualityOfPas.setCustomValidity('');
                } else if(baseScore >= 75){
                    document.getElementById('password').style.borderColor="green";
                    qualityOfPas.setCustomValidity('');
                }else {
                    qualityOfPas.setCustomValidity('');
                }
            }else{
                document.getElementById('password').style.borderColor="black";
                qualityOfPas.setCustomValidity('Пароль должен состоять из 8 символов');
            }

        },
        'formSignUp.repPassword': function (val) {
            const { passwordEq } = this.$refs;
            if (this.formSignUp.password != val) {
                passwordEq.setCustomValidity('Пароли должны совпадать');
            } else {
                passwordEq.setCustomValidity('');
            }
        },
        'formSignUp.phoneNumber': function (val) {
            const { phoneNumberEq } = this.$refs;
            let flag=false;
            this.users.forEach((user)=>{
                if (user.phoneNumber == val)
                    flag=true
            })
            if(flag){
                phoneNumberEq.setCustomValidity('Номер телефона занят');
            }else{
                phoneNumberEq.setCustomValidity('');
            }
        }
    }
}


