import React , { useState} from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  }
};



const Addproduct = () => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
      
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );


    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
      setDesc(e);
      // console.log(e)
    };
  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form action="">
            <CustomInput type="text" label="Enter Product Title"/>
            <div className='mb-3'>
            <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
                handleDesc(evt);
            }}
          />
            </div>
            <CustomInput type="Number" label="Enter Product Price"/>
            <select name="" id="" className="form-control py-3 mb-3">
            <option value="">Select Product category</option>
          </select>
            <CustomInput type="color" label="Select Product Color"/>
            <CustomInput type="Number" label="Product Quantity"/>
            <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>

            <button className='btn btn-success border-0 rounded-3 my-3' type='submit'> Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct
