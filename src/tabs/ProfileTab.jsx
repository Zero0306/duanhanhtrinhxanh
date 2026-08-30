import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Ship, Landmark } from 'lucide-react';

export default function ProfileTab({ user, onLogout }) {
    const [currentWorkspace, setCurrentWorkspace] = useState('customer'); // customer, driver, admin

    useEffect(() => {
        const saved = localStorage.getItem('currentWorkspace');
        if (saved) {
            setCurrentWorkspace(saved);
        }
    }, []);

    const handleWorkspaceChange = (workspace) => {
        setCurrentWorkspace(workspace);
        localStorage.setItem('currentWorkspace', workspace);
    };

    return (
        <div className="p-4 space-y-6">
            {/* Profile Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-1.5">
                        <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Người dùng'}</h2>
                        {user?.kycVerified && (
                            <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                        )}
                    </div>
                    <p className="text-gray-500">{user?.phone || 'Chưa cập nhật SĐT'}</p>
                </div>
            </div>

            {/* Workspace Switcher */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 px-1">Chuyển đổi Kênh (Workspace)</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleWorkspaceChange('driver')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${currentWorkspace === 'driver'
                                ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Ship className={`w-8 h-8 ${currentWorkspace === 'driver' ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm">Kênh Chủ Ghe</span>
                    </button>

                    <button
                        onClick={() => handleWorkspaceChange('admin')}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${currentWorkspace === 'admin'
                                ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Landmark className={`w-8 h-8 ${currentWorkspace === 'admin' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm text-center">Quản trị HTX</span>
                    </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                    Đang ở chế độ: <span className="font-semibold">{
                        currentWorkspace === 'driver' ? 'Chủ Ghe' :
                            currentWorkspace === 'admin' ? 'Hợp Tác Xã' : 'Khách Hàng'
                    }</span>
                </p>
            </div>

            {/* Logout */}
            <div className="pt-4">
                <button
                    onClick={onLogout}
                    className="w-full bg-white text-red-500 border border-red-100 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}
