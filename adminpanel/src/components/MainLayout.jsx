import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { RiCouponLine } from "react-icons/ri";
import { IoTicketSharp } from "react-icons/io5";
import { AiFillFile } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaClipboardList,
  FaBloggerB,
  FaUsers,
  FaWpforms,
  FaQuestionCircle
} from "react-icons/fa";
import { SiBrandfolder, SiLogstash } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser
} from "react-icons/ai";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {" "}
          <h2 className="fs-5 text-center py-3 mb-0">
            <span className="sm-logo">CA</span>
            <span className="lg-logo">Accounts Cart</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard />,
              label: "Dashboard"
            },
            {
              key: "account",
              icon: <GiHamburgerMenu />,
              label: "Account Details"
            },
            {
              key: "users",
              icon: <FaUsers />,
              label: "Users"
            },
            {
              key: "customers",
              icon: <AiOutlineUser />,
              label: "Customers"
            },
            {
              key: "Catalog",
              icon: <VideoCameraOutlined />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart />,
                  label: "Add Product"
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart />,
                  label: "Product List"
                },
                {
                  key: "category",
                  icon: <BiCategory />,
                  label: "Catagory  "
                },
                {
                  key: "list-category",
                  icon: <SiBrandfolder />,
                  label: "Category List"
                },
                {
                  key: "pricing",
                  icon: <BiCategory />,
                  label: "Pricing Rule  "
                },
                {
                  key: "pricing-list",
                  icon: <SiBrandfolder />,
                  label: "Price List"
                }
              ]
            },
            {
              key: "marketing",
              icon: <RiCouponLine />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog />,
                  label: "Add Coupon"
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine />,
                  label: "Coupon List"
                }
              ]
            },
            {
              key: "orders",
              icon: <FaClipboardList />,
              label: "Orders"
            },
            {
              key: "media",
              icon: <BsFillImageFill />,
              label: "Media"
            },
            {
              key: "blogs",
              icon: <FaBloggerB />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog />,
                  label: "Add Blog"
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB />,
                  label: "Blog List"
                },
                {
                  key: "blog-category",
                  icon: <ImBlog />,
                  label: "Add Blog Category"
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB />,
                  label: "Blog Category List"
                }
              ]
            },
            {
              key: "enquiries",
              icon: <FaQuestionCircle />,
              label: "Enquiries"
            },
            {
              key: "tickets",
              icon: <IoTicketSharp />,
              label: "Tickets"
            },
            {
              key: "pages",
              icon: <AiFillFile />,
              label: "Pages"
            },
            {
              key: "forms",
              icon: <FaWpforms />,
              label: "Forms"
            },
            {
              key: "logs",
              icon: <SiLogstash />,
              label: "Logs"
            },
            {
              key: "logout",
              icon: <FiLogOut />,
              label: "Logout"
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between pe-5"
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          <div className="d-flex gap-4 align-items-center ">
            <div className="position-relative">
              <IoIosNotifications className="fs-4 text-secondary" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div>
              <div
                role="button"
                id="dopdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0 ">Yash</h5>
                {/* <p className="mb-0">yashrajinfo48@gmail.com</p> */}
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                id="dopdownMenuLink"
              >
                <li>
                  <Link
                    to="#"
                    className="dropdown-item py-1 mb-1 "
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="dropdown-item py-1 mb-1 "
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
