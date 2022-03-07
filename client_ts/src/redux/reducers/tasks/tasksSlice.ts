import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDTO } from "../../../../../models/dtos/taskDTO";
import { createTask } from "../../actionCreators/tasks/createTask";
import UserDTO from "../../../../../models/dtos/userDTO";
import { stat } from "fs";

interface TasksState {
    tasks?: TaskDTO[];
}

const initialState: TasksState = {
    tasks: undefined,
};

export const TasksStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskDTO>) {
            state.tasks?.push(action.payload);
        },
        setTasks(state, action: PayloadAction<TaskDTO[]>) {
            state.tasks = [...action.payload];
        },
    },
    extraReducers: {
        [createTask.fulfilled.type]: (state, action: PayloadAction<TaskDTO | undefined>) => {
            if (!state.tasks) state.tasks = [];
            if (action.payload) state.tasks.push(action.payload);
        },
    },
});
