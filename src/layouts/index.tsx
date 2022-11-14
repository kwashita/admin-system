import {Layout} from "antd";


const LayoutIndex = (props: any) => {
    const {Sider, Content} = Layout;
    const {isCollapse, updateCollapse, setAuthButtons} = props;

    const getAuthButtonsList = async ()=>{
         const {data} = await getAuthorButtons();
    }
}