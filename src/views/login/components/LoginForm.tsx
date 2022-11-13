import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login"; 

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    setLoading(true);
    console.log(loginForm);

    loginForm.password = md5(loginForm.password);
    const { data } = await loginApi(loginForm);
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
