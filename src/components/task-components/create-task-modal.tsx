import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import Input from "../input";
import Select from "../select";
import TextArea from "../text-area";
import { useCreateTask } from "../../hooks/useTodos";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
type TaskStatus = "pending" | "in-progress" | "done";

export default function CreateTaskModal({ isOpen, setIsOpen }: Props) {
  const { mutateAsync: createTask } = useCreateTask();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: TaskStatus;
    extras: any[];
  }>({
    title: "",
    description: "",
    status: "pending",
    extras: [],
  });

  const statuses = [
    { name: "Pending 📌", value: "pending" },
    { name: "In-progress 📝", value: "in-progress" },
    { name: "Completed ✅", value: "completed" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (option: any) => {
    const { value } = option;
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await createTask({
        ...formData,
        status: formData.status as "pending" | "in-progress" | "done",
      });

      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task created successfully 🎉");

      setFormData({
        title: "",
        description: "",
        status: "pending",
        extras: []
      });
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="text-lg font-medium">Create New Task</h1>
          <p className="text-xs text-gray-400">
            Created task would be added to task collection
          </p>
        </div>
        <div className="mt-6 space-y-4 md:space-y-6">
          <Input
            name="title"
            value={formData.title}
            placeholder="Task title"
            label=""
            onChange={handleChange}
            variant="light"
          />
          <TextArea
            name="description"
            value={formData.description}
            placeholder="Task description"
            label=""
            onChange={handleChange}
            variant="light"
          />
          <Select
            name="status"
            label="Status"
            value={formData.status}
            options={statuses}
            onChange={handleSelect}
            variant="light"
          />
        </div>
        <div className="my-5">
          <Button loading={isLoading} rounded={false} className="w-full">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
