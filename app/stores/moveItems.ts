import { SubcategoryItem } from "@/types";

const move = <T>(arr: T[], first: number, second: number) => {
  const newArr = [...arr];
  newArr[second] = arr[first];
  newArr[first] = arr[second];
  return newArr;
};

const handleMove = <T>(
  direction: 'up' | 'down',
  pressed: number,
  arr: T[]
) => {
  if (direction === 'down') {
    if (pressed < arr.length - 1) {
      return move(arr, pressed, pressed + 1);
    }
  }
  if (direction === 'up') {
    if (pressed > 0) {
      return move(arr, pressed - 1, pressed);
    }
  }
  return arr;
};

export default handleMove;
