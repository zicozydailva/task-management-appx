import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import KeyValueComponent from "../key-value-component";
import StatusPill from "../status-pill";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    taskDetails: Record<string, any>;
}

export default function TaskDetailsModal({
    isOpen,
    setIsOpen,
    taskDetails,
}: Props) {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
                <h1 className="text-lg font-semibold">Task Details</h1>
                <div className="max-h-[680px] divide-y divide-gray-200 overflow-y-scroll py-3 md:py-6">
                    <KeyValueComponent
                        name="Title"
                        value={taskDetails?.title}
                        size="sm"
                    />
                    <KeyValueComponent
                        name="Description"
                        value={taskDetails?.description}
                        size="sm"
                    />
                    <KeyValueComponent
                        name="Due Date"
                        value={taskDetails?.extras?.dueDate ? new Date(taskDetails?.extras?.dueDate).toLocaleDateString() : "—"}
                        size="sm"
                    />
                    <KeyValueComponent
                        name="Priority"
                        value={
                            taskDetails?.extras?.priority ? (
                                <StatusPill status={taskDetails.extras.priority} />
                            ) : (
                                "—"
                            )
                        }
                        size="sm"
                    />
                    <KeyValueComponent
                        name="Tags"
                        value={
                            Array.isArray(taskDetails?.extras?.tag) && taskDetails?.extras?.tag?.length > 0 ? (
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {taskDetails?.extras?.tag.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                "—"
                            )
                        }
                        size="sm"
                    />
                    <KeyValueComponent
                        name="Created"
                        value={taskDetails?.created_at ? new Date(taskDetails?.created_at).toLocaleString() : "—"}
                        size="sm"
                    />
                </div>
            </div>
        </Modal>
    );
}
