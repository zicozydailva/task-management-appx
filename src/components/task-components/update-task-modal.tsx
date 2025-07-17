import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import Input from "../input";
import Select from "../select";
import TextArea from "../text-area";
import { useUpdateTask } from "../../hooks/useTodos";
import { TaskStatus } from '../../interfaces/index';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: any;
}

export default function UpdateTaskModal({ isOpen, setIsOpen, selectedItem }: Props) {
  const updateMutation = useUpdateTask();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: TaskStatus;
    extras: {
      tags?: string[];
      dueDate?: string;
      priority?: "low" | "medium" | "high";
    };
  }>({
    title: "",
    description: "",
    status: "pending",
    extras: {},
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || "",
        description: selectedItem.description || "",
        status: selectedItem.status || "pending",
        extras: selectedItem.extras || {},
      });
      setTagInput(selectedItem.extras?.tags?.join(", ") || "");
    }
  }, [selectedItem]);

  const statuses = [
    { name: "Pending 📌", value: "pending" },
    { name: "In-progress 📝", value: "in-progress" },
    { name: "Completed ✅", value: "completed" },
  ];

  const priorities = [
    { name: "Low 🔵", value: "low" },
    { name: "Medium 🟡", value: "medium" },
    { name: "High 🔴", value: "high" },
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

      const cleanTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      updateMutation.mutate({
        id: selectedItem.id,
        updates: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          extras: {
            ...formData.extras,
            tags: cleanTags,
          },
        },
      });

      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task updated successfully 🎉");
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="text-lg font-medium">Update Task</h1>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              name="dueDate"
              type="date"
              value={formData.extras.dueDate || ""}
              label="Due Date"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  extras: { ...formData.extras, dueDate: e.target.value },
                })
              }
              variant="light"
            />
            <Select
              name="priority"
              label="Priority"
              value={formData.extras.priority || ""}
              options={priorities}
              onChange={(opt) =>
                setFormData({
                  ...formData,
                  extras: {
                    ...formData.extras,
                    priority: opt.value as "low" | "medium" | "high",
                  },
                })
              }
              variant="light"
            />
          </div>

          <Input
            type="text"
            name="tags"
            label="Tags (comma-separated)"
            placeholder="e.g. design, urgent"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={() =>
              setFormData({
                ...formData,
                extras: {
                  ...formData.extras,
                  tags: tagInput
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
                },
              })
            }
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
