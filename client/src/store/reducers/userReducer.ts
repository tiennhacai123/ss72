import axios from "axios";
import { User } from "../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Khởi tạo trạng thái ban đầu
const initialState = {
    users: [] as User[], // Khai báo kiểu dữ liệu cho mảng users
    loading: false,
    error: null as string | null, // Khai báo kiểu dữ liệu cho lỗi
};

// Thunk để lấy tất cả người dùng
export const getUser:any = createAsyncThunk("users/getAllUser", async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
});

// Thunk để thêm mới người dùng
export const addUser:any = createAsyncThunk("users/addUser", async (user: User) => {
    const response = await axios.post("http://localhost:8080/users", user);
    return response.data;
});

// Thunk để xóa người dùng
export const deleteUser:any = createAsyncThunk("users/deleteUser", async (id: number) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    return id; // Trả về id của người dùng đã bị xóa
});

// Thunk để cập nhật người dùng
export const updateUser:any = createAsyncThunk("users/updateUser", async ({ id, user }: { id: number, user: User }) => {
    const response = await axios.put(`http://localhost:8080/users/${id}`, user);
    return response.data;
});

// Slice quản lý người dùng
const reducerUser = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Khai báo các action khác nếu cần
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Lỗi khi lấy dữ liệu";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                // Xóa người dùng bằng cách lọc ra các user có id khác với id bị xóa
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                // Cập nhật thông tin người dùng
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            });
    },
});

// Xuất reducer để sử dụng trong store
export default reducerUser.reducer;
