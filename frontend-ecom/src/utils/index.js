import { FaBox, FaBoxOpen, FaCaretDown, FaHome, FaIcons, FaShoppingCart, FaStore } from "react-icons/fa";
import { bannerImageOne } from "./constant";
import { bannerImageTwo } from "./constant";
import { bannerImageThree } from "./constant";
import { bannerImageFour } from "./constant";
 export const bannerList =[
    {
    id: 1,
    image: bannerImageThree,
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
  },
  {
    id: 2,
    image: bannerImageTwo,
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
  },
  {
    id: 3,
    image: bannerImageOne,
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
},
{
  id: 4,
  image: bannerImageFour,
  title: "Fresh Picks",
  subtitle: "Groceries Store",
  description: "Farm-fresh groceries and essentials at great prices",
}
];

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FaHome,
    current:true
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
  }
  ,{
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
    
  },{
    name: "Categories",
    href: "/admin/categories",
    icon: FaIcons,
  },{
    name: "Sellers",
    href: "/admin/sellers",
    icon: FaStore,
  }
]

