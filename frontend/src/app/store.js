import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
