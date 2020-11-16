import fetch from "./index";

// const URL = 'http://costco.host:7001'
const URL = "http://127.0.0.1:7001";

export const productList = async data => {
  const opt = {
    url: URL + "/product/list",
    method: "post",
    data
  };
  const responseData = await fetch(opt);
  return responseData;
};

export const productCreate = async data => {
  const opt = {
    url: URL + "/product/create",
    method: "post",
    data
  };
  const responseData = await fetch(opt);
  return responseData;
};

export const productEdit = async data => {
  const opt = {
    url: URL + "/product/edit",
    method: "post",
    data
  };
  const responseData = await fetch(opt);
  return responseData;
};

//商品类目
export const categoryList = async data => {
  const opt = {
    url: URL + "/category/list",
    method: "post",
    data
  };
  const responseData = await fetch(opt);
  return responseData;
};

//图片上传
export const upload = async data => {
  const opt = {
    url: URL + "/upload",
    method: "post",
    data
  };
  const responseData = await fetch(opt);
  return responseData;
};
