import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Login } from "../../../api/interface";
import { loginApi } from "../../../api/modules/login"; 
import { setToken } from "@/redux/modules/global/action";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";

const LoginForm = (props: any) => {
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const {setToken, setTabsList} = props;
  const navigate = useNavigate(); 

  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      loginForm.password = md5(loginForm.password);
      const { data } = await loginApi(loginForm);
      setToken(data?.access_token);
      // setTabsList([]);
      message.success("Login successed~!");
      navigate(HOME_URL);
      
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    console.log("failed");
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="login-btn">
        <Button icon={<CloseCircleOutlined />}>Submit</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        ></Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
