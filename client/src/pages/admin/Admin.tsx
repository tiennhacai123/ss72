import { useDispatch, useSelector } from "react-redux";
import { getUser, addUser, deleteUser, updateUser } from "../../store/reducers/userReducer";
import { useEffect, useState } from "react";
import { User } from "../../interface";

export default function Admin() {
    // Lấy dữ liệu từ Redux state
    const { users, loading, error } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    // State để lưu người dùng đang được chỉnh sửa
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newName, setNewName] = useState<string>("");

    useEffect(() => {
        // Gọi API để lấy danh sách người dùng khi component được render lần đầu
        dispatch(getUser());
    }, [dispatch]);

    // Hàm thêm mới người dùng
    const addNewUser = () => {
        let newUser = {
            name: "thảo phương1234"
        }
        dispatch(addUser(newUser));
    }

    // Hàm xóa người dùng
    const handleDeleteUser = (id: number) => {
        dispatch(deleteUser(id));
    }

    // Hàm bắt đầu chỉnh sửa người dùng
    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setNewName(user.name); // Thiết lập giá trị ban đầu cho form chỉnh sửa
    }

    // Hàm hủy bỏ việc chỉnh sửa
    const handleCancelEdit = () => {
        setEditingUser(null);
        setNewName("");
    }

    // Hàm cập nhật người dùng
    const handleUpdateUser = () => {
        if (editingUser) {
            dispatch(updateUser({ id: editingUser.id, user: { ...editingUser, name: newName } }));
            setEditingUser(null); // Hủy bỏ trạng thái chỉnh sửa sau khi cập nhật
            setNewName("");
        }
    }

    return (
        <div>
            <h2>Admin</h2>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        {user.name} 
                        <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                        <button onClick={() => handleEditUser(user)}>Sửa</button>
                    </li>
                ))}
            </ul>
            <button onClick={addNewUser}>Thêm người dùng</button>

            {editingUser && (
                <div>
                    <h3>Chỉnh sửa người dùng</h3>
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                        placeholder="Tên mới"
                    />
                    <button onClick={handleUpdateUser}>Cập nhật</button>
                    <button onClick={handleCancelEdit}>Hủy bỏ</button>
                </div>
            )}
        </div>
    );
}
