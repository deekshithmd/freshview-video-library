import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Fish Farming",
    videoThumbnail: "https://i.postimg.cc/9f9bz3VZ/fish-4.png",
  },
  {
    _id: uuid(),
    categoryName: "Poultry Farming",
    videoThumbnail: "https://i.postimg.cc/Njq5YZNW/poultry-1.png",
  },

  {
    _id: uuid(),
    categoryName: "Forestry Farming",
    videoThumbnail: "https://i.postimg.cc/3JbFBrx2/forest-3.png",
  },
  {
    _id: uuid(),
    categoryName: "Vegetable Farming",
    videoThumbnail: "https://i.postimg.cc/bvLJxrzh/vegetable-3.png",
  },
  {
    _id: uuid(),
    categoryName: "Dairy Farming",
    videoThumbnail: "https://i.postimg.cc/RhdX9cmY/dairy-3.png",
  },
  {
    _id: uuid(),
    categoryName: "Fruit Farming",
    videoThumbnail: "https://i.postimg.cc/HLb0dQ4t/fruit-3.png",
  },
  {
    _id: uuid(),
    categoryName: "Others",
    videoThumbnail: "https://i.postimg.cc/dtzT3h0N/others-3.png",
  },
];
