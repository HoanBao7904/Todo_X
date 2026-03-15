import instance from "@/utils/http";

// export const getTaskListApi = () => {
//   return instance.get("/api/tasks");
// };
export const getTaskListApi = (filter = "today") => {
  return instance.get(`/api/tasks?filter=${filter}`);
};

export const addTaskApi = (title) => {
  return instance.post("/api/tasks", { title });
};

export const updateTaskApi = ({ id, data }) => {
  return instance.put(`/api/tasks/${id}`, data);
};

export const deleteTaskApi = (id) => {
  return instance.delete(`/api/tasks/${id}`);
};
