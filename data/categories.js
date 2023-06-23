import { FaEgg } from "@react-icons/all-files/fa/FaEgg";
import {GiHamShank} from  "@react-icons/all-files/gi/GiHamShank";
import {GiFruitBowl} from "@react-icons/all-files/gi/GiFruitBowl";
import {GiPotato} from "@react-icons/all-files/gi/GiPotato";
import {GiDrinkMe} from "@react-icons/all-files/gi/GiDrinkMe";

export const categories = [
  {
    name: "dairy",
    icon: <FaEgg />,
    desc: "Products that are made from milk, such as eggs, cheese, and yogurt.",
  },
  {
    name: "meat",
    icon: <GiHamShank />,
    desc: "Various types of meat, including beef, pork, chicken, and lamb.",
  },
  {
    name: "fruits",
    icon: <GiFruitBowl />,
    desc: "Different kinds of fresh and dried fruits, such as apples, bananas, and raisins.",
  },
  {
    name: "vegetables",
    icon: <GiPotato />,
    desc: "A variety of vegetables, including potatoes, carrots, broccoli, and spinach.",
  },
  {
    name: "drinks",
    icon: <GiDrinkMe />,
    desc: "Beverages that can be consumed, such as water, juice, soda, and tea.",
  },
];