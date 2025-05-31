"use client";

import SettingHeader from "@/app/(pluma)/settings/SettingHeader";
import { updatePassword } from "@/app/actions/users/updatePassword";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Account() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePassword(formData);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <SettingHeader
        title="Account"
        description="Update your account settings."
      />
      <div className="mt-4">
        <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="currentPassword">Current Password</label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange(e)}
              className="w-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="newPassword">New Password</label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange(e)}
              className="w-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              className="w-sm"
            />
          </div>
          <Button type="submit" className="mt-4 max-w-fit cursor-pointer">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
