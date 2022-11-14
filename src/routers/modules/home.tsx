import {LayoutIndex} from '@/routers/constant';



const homeRouter: Array<RouteObject> = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: "/home/index",
                element: <Home />,
                meta: {
                    requiresAtuh: true,
                    title: "首页",
                    key: "home"
                }
            }
        ]
    }
]

export default homeRouter;