import React, { useState, useEffect } from "react";
import style from "./product.module.scss";

import BraftEditor from "braft-editor";
import {
  Form,
  Input,
  Button,
  Table,
  Drawer,
  Space,
  Upload,
  Modal,
  Switch,
  Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomCard from "../../components/CustomCard";
import LazyOptions from "../../components/LazyOptions";
import {
  productList,
  productEdit,
  productCreate,
  categoryList,
  upload
} from "../../api/api";
import dayjs from "dayjs";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    span: 16
  }
};
const { Option } = Select;

export default () => {
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [productDetailVisible, setProductDetailVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);
  const [editorState, setEditorState] = useState(null);
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const onSearch = values => {
    console.log("Success:", values);
    getProductList(values);
  };
  const onSubmit = data => {
    console.log("Success:", data);

    productCreate({
      ...data,
      id: Number(data.id),
      majorPhoto: data.majorPhoto.fileList.map(i => i.response.data).join(","),
      thumb: data.majorPhoto.fileList.map(i => i.response.data)[0]
    }).then(res => {
      getProductList();
    });

    setVisible(false);
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const getCategoryList = (parentId = 0) => {
    categoryList({ parentId }).then(res => {
      setCategoryLists(res.data.data.list);
    });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const getProductList = data => {
    productList({
      pageSize: 10,
      pageNum: 1,
      ...data
    }).then(res => {
      setProductLists(res.data.data.list);
    });
  };

  const editProduct = data => {
    productEdit(data).then(res => {
      getProductList();
    });
  };

  useEffect(_ => {
    getCategoryList();
    getProductList();
  }, []);

  const columns = [
    {
      title: "商品编号",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "商品图片",
      dataIndex: "thumb",
      key: "thumb",
      render: src => (
        <>
          <img style={{ width: "100px" }} src={src} />
        </>
      )
    },
    {
      title: "商品类目",
      dataIndex: "category",
      key: "category",
      render: id => <>{categoryLists.find(i => (i.id = id)).name}</>
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "运费",
      dataIndex: "freight",
      key: "freight"
    },
    {
      title: "是否推荐品",
      dataIndex: "isRecommend",
      key: "isRecommend",
      render: v => <>{(v && "是") || "否"}</>
    },
    {
      title: "上架时间",
      dataIndex: "gmtCreate",
      key: "gmtCreate",
      width: "200px",
      render: v => <>{dayjs(v).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
      title: "销售量",
      dataIndex: "salesAmount",
      key: "salesAmount"
    },
    {
      title: "浏览量",
      dataIndex: "viewAmount",
      key: "viewAmount"
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={_ =>
              editProduct({ id: record.id, isActive: Number(!record.isActive) })
            }
          >
            {record.isActive ? (
              <span style={{ color: "lightgreen" }}>下架</span>
            ) : (
              <span style={{ color: "red" }}>上架</span>
            )}
          </a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <CustomCard>
        <Form
          layout="inline"
          {...layout}
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={onSearch}
        >
          <Form.Item label="商品编号" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="商品名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label="是否推荐"
            name="isRecommend"
            style={{ width: "240px" }}
          >
            <Select>
              <Option value={1}>是</Option>
              <Option value={0}>否</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="是否上架"
            name="isActive"
            style={{ width: "240px" }}
          >
            <Select allowClear>
              <Option value={1}>是</Option>
              <Option value={0}>否</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
      <CustomCard>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={showDrawer}
        >
          新增商品
        </Button>
        <Table
          scroll={{ x: 1500 }}
          columns={columns}
          dataSource={productLists}
        />
      </CustomCard>
      <Drawer
        title="新增商品"
        placement="right"
        width="60%"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          {...{
            labelCol: {
              span: 6
            },
            wrapperCol: {
              span: 16
            }
          }}
          name="新增商品"
          initialValues={{
            remember: true
          }}
          onFinish={onSubmit}
        >
          <Form.Item label="商品编号" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="商品名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="商品类目" name="category">
            {/* <LazyOptions /> */}
            <Select>
              {categoryLists.map(i => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="商品价格" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="商品主图" name="majorPhoto">
            <Upload
              action="http://127.0.0.1:7001/upload"
              headers={{
                enctype: "multipart/form-data"
              }}
              method="post"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 3 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          {/* <Form.Item
            label="商品详情"
            name="isRecommend"
          >
            <BraftEditor
              value={editorState}
            // onChange={this.handleEditorChange}
            // onSave={this.submitContent}
            />
          </Form.Item> */}
          <Form.Item label="是否为推荐品" name="isRecommend">
            <Switch />
          </Form.Item>
          <Form.Item label="是否上架" name="isActive">
            <Switch />
          </Form.Item>
          <Form.Item label="运费" name="freight">
            <Input />
          </Form.Item>
          <Form.Item
            {...{
              wrapperCol: {
                span: 22
              }
            }}
          >
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
