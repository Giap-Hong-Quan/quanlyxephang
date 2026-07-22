import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../../store/useHeaderStore';
import { useCreateUserQuery, useDeleteUserQuery, useGetAllUserQuery, useUpdateUserQuery } from '../../../hooks/userQuery';
import { useUserSocket } from '../../../hooks/useUserSocket';
import { Users, Search, PlusCircle, UserCheck, UserX, Edit3, Trash2, Shield, Lock, Mail, Phone, User as UserIcon } from 'lucide-react';
import { useUI } from '../../../context/UiProvider';
import { Select, Input, Modal, Form, Popconfirm, Tooltip } from 'antd';
import type { User } from '../../../types/userType';

const UserPage = () => {
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form] = Form.useForm();
  const { setLoading } = useUI();
  useUserSocket();
  
  const { data, isLoading } = useGetAllUserQuery();
  const createUserMutation = useCreateUserQuery();
  const updateUserMutation = useUpdateUserQuery();
  const deleteUserMutation = useDeleteUserQuery();

  useEffect(() => {
    useHeaderStore.setState({ title: "Tài khoản", subTitle: "Danh sách tài khoản hệ thống" });
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const filteredUsers = data?.users.filter((u) => {
    const matchesRole = !roleFilter || u.role?.name?.toLowerCase() === roleFilter.toLowerCase();
    const matchesSearch = !searchKey || 
      u.full_name?.toLowerCase().includes(searchKey.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchKey.toLowerCase());
    return matchesRole && matchesSearch;
  }) || [];

  const handleOpenAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      role: user.role?.name || 'staff',
      status: user.isActive ? 'active' : 'inactive'
    });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (values: any) => {
    if (editingUser) {
      updateUserMutation.mutate(
        { id: editingUser._id, data: values },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            form.resetFields();
          }
        }
      );
    } else {
      createUserMutation.mutate(values, {
        onSuccess: () => {
          setIsModalOpen(false);
          form.resetFields();
        }
      });
    }
  };

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="w-full space-y-6 pb-8 select-none">
      {/* Header Clay Bar */}
      <div className="clay-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <Users size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Quản lý Tài khoản</h2>
            <p className="text-xs text-slate-400">Danh sách tài khoản nhân sự và phân quyền</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              allowClear
              placeholder="Tất cả vai trò"
              style={{ width: '100%' }}
              value={roleFilter}
              onChange={(val) => setRoleFilter(val)}
              options={[
                { value: 'admin', label: 'Admin (Quản trị)' },
                { value: 'doctor', label: 'Doctor (Bác sĩ)' },
                { value: 'staff', label: 'Staff (Nhân viên)' },
              ]}
            />
          </div>

          <div className="w-64">
            <Input
              placeholder="Tìm theo tên, email..."
              prefix={<Search size={16} className="text-slate-400 mr-1" />}
              onChange={(e) => setSearchKey(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="clay-btn clay-btn-orange text-xs font-bold py-2.5 px-4"
          >
            <PlusCircle size={16} />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* Clay Data Table */}
      <div className="clay-card p-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold uppercase">
                <th className="py-3.5 px-4 rounded-tl-xl">Avatar</th>
                <th className="py-3.5 px-4">Họ và tên</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Số điện thoại</th>
                <th className="py-3.5 px-4">Vai trò</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-center rounded-tr-xl">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? "bg-white hover:bg-orange-50/50" : "bg-slate-50/70 hover:bg-orange-50/50"}>
                  <td className="py-3 px-4">
                    {item.avatar_url ? (
                      <img src={item.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                        {item.full_name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{item.full_name}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{item.email}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{item.phone || '-'}</td>
                  <td className="py-3 px-4">
                    <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]">
                      {item.role?.name || 'Staff'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`clay-badge ${item.isActive ? 'clay-badge-completed' : 'clay-badge-skipped'}`}>
                      {item.isActive ? <UserCheck size={14} /> : <UserX size={14} />}
                      {item.isActive ? "Hoạt động" : "Tắt"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip title="Cập nhật">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                          <Edit3 size={15} />
                        </button>
                      </Tooltip>

                      <Popconfirm
                        title="Xóa tài khoản"
                        description="Bạn có chắc chắn muốn xóa tài khoản này không?"
                        onConfirm={() => handleDeleteUser(item._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                      >
                        <Tooltip title="Xóa">
                          <button className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                            <Trash2 size={15} />
                          </button>
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={null}
        centered
        className="clay-modal"
      >
        <div className="p-2 space-y-6 select-none">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
              <Users size={22} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">
                {editingUser ? "Cập nhật Tài khoản" : "Thêm Tài khoản Mới"}
              </h3>
              <p className="text-xs text-slate-400">
                {editingUser ? "Chỉnh sửa thông tin tài khoản nhân sự" : "Tạo tài khoản người dùng và phân quyền mới"}
              </p>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={handleModalSubmit} initialValues={{ role: 'staff', status: 'active' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-bold text-slate-700">Họ và tên *</span>}
                name="full_name"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              >
                <Input prefix={<UserIcon size={16} className="text-slate-400 mr-1" />} placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-slate-700">Email đăng nhập *</span>}
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input prefix={<Mail size={16} className="text-slate-400 mr-1" />} placeholder="user@gmail.com" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-bold text-slate-700">Số điện thoại *</span>}
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input prefix={<Phone size={16} className="text-slate-400 mr-1" />} placeholder="0901234567" />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-slate-700">Vai trò phân quyền *</span>}
                name="role"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
              >
                <Select
                  options={[
                    { value: 'admin', label: 'Admin (Quản trị viên)' },
                    { value: 'doctor', label: 'Doctor (Bác sĩ)' },
                    { value: 'staff', label: 'Staff (Nhân viên)' },
                  ]}
                />
              </Form.Item>
            </div>

            {!editingUser && (
              <Form.Item
                label={<span className="font-bold text-slate-700">Mật khẩu *</span>}
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password prefix={<Lock size={16} className="text-slate-400 mr-1" />} placeholder="Nhập mật khẩu" />
              </Form.Item>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn clay-btn-glass text-xs font-bold py-2.5 px-5"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={createUserMutation.isPending || updateUserMutation.isPending}
                className="clay-btn clay-btn-orange text-xs font-extrabold py-2.5 px-6 shadow-md"
              >
                {editingUser ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UserPage;