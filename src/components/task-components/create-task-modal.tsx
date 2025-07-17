import { Dispatch, FormEvent, SetStateAction, useState, useEffect } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import Input from "../input";
import Select from "../select";
import TextArea from "../text-area";
import { useCreateTask } from "../../hooks/useTodos";
import { TaskStatus } from "../../interfaces";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateTaskModal({ isOpen, setIsOpen }: Props) {
  const { mutateAsync: createTask } = useCreateTask();
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

      const cleanTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      await createTask({
        ...formData,
        status: formData.status as "pending" | "in-progress" | "done",
        extras: {
          ...formData.extras,
          tags: cleanTags,
        }
      });

      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task created successfully 🎉");

      setFormData({
        title: "",
        description: "",
        status: "pending",
        extras: {}
      });
      setTagInput("");
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };


  const [tagInput, setTagInput] = useState("");
  useEffect(() => {
    setTagInput(formData.extras.tags?.join(", ") || "");
  }, [formData.extras.tags]);


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
              options={[
                { name: "Low 🔵", value: "low" },
                { name: "Medium 🟡", value: "medium" },
                { name: "High 🔴", value: "high" },
              ]}
              onChange={(opt) =>
                setFormData({
                  ...formData,
                  extras: {
                    ...formData.extras,
                    priority: opt.value as 'low' | 'medium' | 'high',
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
            onChange={e => setTagInput(e.target.value)}
            variant="light"
            onBlur={() => {
              setFormData({
                ...formData,
                extras: {
                  ...formData.extras,
                  tags: tagInput
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== ""),
                }
              });
            }}
          />

        </div>
        <div className="my-5">
          <Button disabled={!formData.title} loading={isLoading} rounded={false} className="w-full">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
