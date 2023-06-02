import  {createRouter, createWebHashHistory} from 'vue-router'
import HomeComponent from "@/components/HomeComponent";
import MyComponent from "@/components/MyComponent";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            component: HomeComponent
        },
        {
            path: '/',
            component: MyComponent
        }
    ]
})
