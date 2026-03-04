import { without } from "ramda";
import { create } from "zustand";

const useCartItemsStore = create(set => ({
  cartItems: [],
  toggleIsInCart: slug => {
    /* add or remove the slug to cartItems */
    set(({ cartItems }) => {
      if (cartItems.includes(slug)) {
        return { cartItems: without([slug], cartItems) };
      }

      return { cartItems: [slug, ...cartItems] };
    });
  },
}));

export default useCartItemsStore;
