import Index from "@/Layout/Index"
import notFoundList from "./404"
import Kong from "@/pages/Kong.vue"
export default [
    {
        path: "/HomePage",
        name: "HomePage",
        redirect: "/Home",
        component: Index,
        children: [
            {
                path: "/Home",
                name: "Home",
                component: () => import("@/pages/Admin/Home/Home.vue"),
                meta: {
                    title: "Home",
                    showRouter: "/Home",
                    icon: "el-icon-s-custom",
                    keepAlive: true,
                    showInBar: true
                }
            }
        ]
    },
    {
        path: "/Page",
        name: "Page",
        redirect: "/Page1",
        component: Index,
        meta: {
            title: "Page",
            icon: "el-icon-s-custom",
        },
        children: [
            {
                path: "/Page1",
                name: "Page1",
                meta: {
                    title: "Page1",
                    showRouter: "/Page1",
                    keepAlive: true,
                    showInBar: true
                },
                component: () => import('@/pages/Admin/Page1/Page1.vue')
            },
            {
                path: "/Page2",
                hidden: false,
                name: "Page2",
                meta: {
                    title: "Page2",
                    showRouter: "/Page2",
                    keepAlive: true
                },
                component: () => import('@/pages/Admin/Page2/Page2'),
            },
            {
                path: "/Page3",
                name: "Page3",
                hidden: true,
                meta: {
                    title: "Page3",
                    showRouter: "/Page1",
                    keepAlive: true
                },
                component: () => import('@/pages/Admin/Page3/Page3.vue')
            },
        ]
    },
    {
        path: "/Page4",
        name: "Page4",
        redirect: "/Page5",
        component: Index,
        children: [
            {
                path: "/Page5",
                hidden: false,
                name: "Page5",
                meta: {
                    title: "Page5",
                    showRouter: "/Page5",
                    icon: "el-icon-s-custom",
                },
                component: () => import('@/pages/Admin/Page3/Page3'),
            },
        ]
    },
    {
        path: "/Page6",
        name: "Page6",
        redirect: "/Page9",
        meta: {
            title: "Page6",
            icon: "el-icon-s-custom",
        },
        component: Index,
        children: [
            {
                path: "/Page7",
                name: "Page7",
                redirect: "/Page9",
                component: Kong,
                meta: {
                    title: "Page7",
                    icon: "el-icon-s-custom",
                },
                children: [
                    {
                        path: "/Page9",
                        name: "Page9",
                        component: () => import("@/pages/Admin/Page1/Page1.vue"),
                        meta: {
                            title: "Page9",
                            showRouter: "/Page9",
                            icon: "el-icon-s-custom",
                        },
                    },
                    {
                        path: "/Page10",
                        name: "Page10",
                        component: () => import("@/pages/Admin/Page1/Page1.vue"),
                        meta: {
                            title: "Page10",
                            showRouter: "/Page10",
                            icon: "el-icon-s-custom",
                        },
                    },
                ]
            },
            {
                path: "/Page8",
                name: "Page8",
                component: () => import("@/pages/Admin/Page1/Page1.vue"),
                meta: {
                    title: "Page8",
                    icon: "el-icon-s-custom",
                },
            },
        ]
    },
    ...notFoundList
]