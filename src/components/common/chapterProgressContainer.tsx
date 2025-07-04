import React, { useState } from "react";
import { ChapterProgress } from "../../types/models/chapter";
import "./chapterProgressContainer.css";
import { useCreateChapterMutation, useUpdateChapterProgressMutation } from "../../redux/api/monthlyTaskApiSlice";
import { showNotification } from "../../utils/notification";
import DynamicForm, { FormField } from "./dynamicForm";

export interface ChapterProgressContainerProps {
  chapters: any; // Accepts the object structure from API
  statusCode: number;
  message: string;
  isLoading: boolean;
  success: boolean;
  taskRefId: string;
  taskProgressId: string;
  pillar: string;
}

const ChapterProgressContainer: React.FC<ChapterProgressContainerProps> = ({
  chapters,
  statusCode,
  message,
  isLoading,
  success,
  taskRefId,
  taskProgressId,
  pillar
}) => {
  const [showModal, setShowModal] = useState(false);
  const [createChapter, { isLoading: isCreating }] = useCreateChapterMutation();
  const [updateChapterProgress, { isLoading: isUpdating }] = useUpdateChapterProgressMutation();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Chapter Name",
      type: "text",
      placeholder: "Enter chapter name",
      required: true,
    },
  ];

  const handleAddChapter = async (data: Record<string, any>) => {
    if (!data.name || !data.name.trim()) {
      showNotification("Chapter name is required", "error");
      return;
    }
    try {
      await createChapter({
        task_ref_id: taskRefId,
        body: { name: data.name.trim() }
      }).unwrap();
      showNotification("Chapter added!", "success");
      setShowModal(false);
    } catch (error: any) {
      showNotification(error?.data?.message || "Failed to add chapter", "error");
    }
  };

  const handleCheckboxChange = async (chapter: any, iteration: string) => {
    setUpdatingId(chapter.id);
    try {
      await updateChapterProgress({
        task_ref_id: taskRefId,
        chapter_id: chapter.id,
        body: { 
          status: !chapter.status,
          task_progress_id: taskProgressId
        }
      }).unwrap();
      showNotification("Chapter progress updated!", "success");
    } catch (error: any) {
      showNotification(error?.data?.message || "Failed to update chapter progress", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={`chapter-progress-container ${pillar}-theme`}>
      <div className={`chapter-progress-header`}>
        <h2>Chapters</h2>
        <button className="add-chapter-btn" onClick={() => setShowModal(true)}>
          + Add Chapter
        </button>
      </div>
      {chapters.length === 0 && (
        <div className={`chapter-progress-message`}>
          {message}
        </div>
      )}
      {/* Modal for adding chapter using DynamicForm */}
      {showModal && (
        <DynamicForm
          title="Add Chapter"
          fields={formFields}
          onSubmit={handleAddChapter}
          onClose={() => setShowModal(false)}
        />
      )}
      {/* Show iterations and chapters if success is true */}
      {success && chapters && typeof chapters === "object" && (
        <div className="iterations-list">
          {Object.entries(chapters)
            // Sort: incomplete (status: false) first, then complete (status: true)
            .sort(([, a]: any, [, b]: any) => Number(a.status) - Number(b.status))
            .map(([iteration, iterationObj]: any) => (
              <div key={iteration} className={`iteration-block${iterationObj.status ? " completed" : ""}`}>
                <h4>Iteration {iteration}</h4>
                <div className="chapters-list">
                  {iterationObj.data.map((chapter: any) => (
                    <div key={chapter.id} className="chapter-row">
                      <input
                        type="checkbox"
                        checked={chapter.status}
                        disabled={isUpdating && updatingId === chapter.id}
                        onChange={() => handleCheckboxChange(chapter, iteration)}
                        className="chapter-checkbox"
                      />
                      <span className="chapter-name">{chapter.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ChapterProgressContainer;