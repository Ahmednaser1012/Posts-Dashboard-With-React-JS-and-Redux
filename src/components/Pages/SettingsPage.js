import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import { showSuccess } from "../../utils/sweetAlert";

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "ar",
    postsPerPage: 10,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // محاكاة حفظ الإعدادات
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    showSuccess("Success", "Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and system settings
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Account Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {user?.name}
              </h4>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                 Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Notification Settings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Notifications
              </h4>
              <p className="text-sm text-gray-500">
               Notify me about new features and updates
              </p>
            </div>
            <button
              onClick={() =>
                handleSettingChange("notifications", !settings.notifications)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Email Updates
              </h4>
              <p className="text-sm text-gray-500">
                Receive email updates about your account
              </p>
            </div>
            <button
              onClick={() =>
                handleSettingChange("emailUpdates", !settings.emailUpdates)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailUpdates ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailUpdates ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Display Settings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Dark Mode
              </h4>
              <p className="text-sm text-gray-500"> Enable dark mode     </p>
            </div>
            <button
              onClick={() =>
                handleSettingChange("darkMode", !settings.darkMode)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posts Per Page
            </label>
            <select
              value={settings.postsPerPage}
              onChange={(e) =>
                handleSettingChange("postsPerPage", parseInt(e.target.value))
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">   Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <Button variant="danger" className="w-full sm:w-auto">
             delete my account
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} loading={isSaving} disabled={isSaving}>
           Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
