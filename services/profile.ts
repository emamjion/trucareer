import api from "@/lib/api";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const updateProfile = async (payload: FormData) => {
  const res = await api.put("/user/profile", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
