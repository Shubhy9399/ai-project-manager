import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

interface TaskState {
  items: Task[];
}

const initialState: TaskState = {
  items: [
    { id: "1", title: "Design dashboard", status: "done" },
    { id: "2", title: "Set up Redux store", status: "progress" },
    { id: "3", title: "Build authentication UI", status: "todo" },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.push(action.payload);
      },
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            status: "todo" as TaskStatus,
          },
        };
      },
    },

    updateTaskStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: TaskStatus;
      }>,
    ) {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (task) {
        task.status = action.payload.status;
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
