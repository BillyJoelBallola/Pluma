"use client";

import SettingHeader from "@/app/(pluma)/settings/SettingHeader";
import { getUserById } from "@/app/actions/users/getUserById";
import { updateUsername } from "@/app/actions/users/updateUsername";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSchemaType } from "@/zod-schemas/users";
import { FormEvent, useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState<UserSchemaType | undefined>();
  const [formData, setFormData] = useState({
    username: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (value: string) => {
    setFormData(() => ({
      username: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUsername(formData);
    setFormData({
      username: "",
    });
  };

  return (
    <div>
      <SettingHeader
        title="Profile"
        description="This is how others will see you on the site."
      />
      <div className="mt-4">
        <div className="mb-4 bg-gray-900 max-w-fit rounded-md p-2">
          <p className="text-xs">Username</p>
          <p className="text-green-500">
            {userData ? userData?.username : "JuanSpankMan"}
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="username">New Username</label>
            <Input
              id="username"
              name="username"
              placeholder="New username"
              value={formData.username}
              onChange={(e) => handleInputChange(e.target.value as string)}
              className="w-sm"
            />
            <p className="text-gray-500">Input your new username here</p>
          </div>
          <Button type="submit" className="mt-4 max-w-fit cursor-pointer">
            Update Username
          </Button>
        </form>
      </div>
    </div>
  );
}
