import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import Input from "../input";
import Select from "../select";
import { useUpdateTask } from "../../hooks/useTodos";
import { TaskStatus } from '../../interfaces/index'
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: any;
}

export default function UpdateTaskModal({
  isOpen,
  setIsOpen,
  selectedItem,
}: Props) {
  const updateMutation = useUpdateTask();

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

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || "",
        description: selectedItem.description || "",
        status: selectedItem.status || "pending",
        extras: selectedItem.extras || [],
      });
    }
  }, [selectedItem]);


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
      setIsLoading(true);
      updateMutation.mutate({
        id: selectedItem.id,
        updates: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
        },
      });


      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task updated successfully 🎉");

      // setFormData({
      //   status: "pending",
      // });
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="text-lg font-medium">Update Task Status</h1>
        </div>
        <div className="mt-6 space-y-4 md:space-y-6">
          <Input
            label=""
            name="title"
            value={formData.title}
            placeholder="Task title"
            onChange={handleChange}
            variant="light"
          />

          <Input
            label=""
            name="description"
            value={formData.description}
            placeholder="Task description"
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
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
