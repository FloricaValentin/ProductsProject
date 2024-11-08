import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  quantity: number;
  rating: number;
  price: number;
  discountPercentage?: number;
  weight?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

interface ProductState {
  products: Product[];
  cart: Product[];
  favorites: Product[];
  selectedProduct: Product | null;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  favorites: [],
  selectedProduct: null,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=20&skip=${page * 20}`
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        const existingItem = state.cart.find((item) => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      }
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const product = state.products.find((prod) => prod.id === action.payload);
      if (product && !state.favorites.some((fav) => fav.id === product.id)) {
        state.favorites.push(product);
      }
    },
    moveToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      state.favorites = state.favorites.filter(
        (item) => item.id !== product.id
      );

      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct =
        state.products.find((prod) => prod.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = [...state.products, ...action.payload];
          state.currentPage += 1;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, addToFavorites, setSelectedProduct, moveToCart } =
  productSlice.actions;

export default productSlice.reducer;
