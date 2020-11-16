import React, { useState } from "react";
import { Cascader } from "antd";

export default props => {
  //  const {options} = props

  const initOptions = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      isLeaf: false
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      isLeaf: false
    }
  ];

  const [options, setOptions] = useState(initOptions);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1"
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2"
        }
      ];

      setOptions([...options]);
    }, 1000);
  };

  return (
    <Cascader
      placeholder="请选择"
      options={options}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect
    />
  );
};
