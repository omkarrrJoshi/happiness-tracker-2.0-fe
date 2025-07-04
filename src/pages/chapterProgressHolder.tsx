import { useParams, useSearchParams } from "react-router-dom";
import WebHeader from "../components/common/webHeader";
import { useFetchChaptersQuery } from "../redux/api/monthlyTaskApiSlice";
import ChapterProgressContainer from "../components/common/chapterProgressContainer";

const ChapterProgressHolder: React.FC = () => {
  const { type, task_ref_id, pillar } = useParams();
  const [searchParams] = useSearchParams();
  const progress_id = searchParams.get("progress_id");
  const { data: chaptersResponse, isLoading: isLoadingChapters } = useFetchChaptersQuery({
    task_ref_id: task_ref_id || "",
    task_progress_id: progress_id || "",
  });

  console.log("chaptersResponse", chaptersResponse);
  console.log("isLoadingChapters", isLoadingChapters);

  return (
    <div>
      <WebHeader title={`${type} chapter's progress`} />
      <ChapterProgressContainer
        chapters={chaptersResponse?.data || []}
        statusCode={chaptersResponse?.statusCode || 0}
        message={chaptersResponse?.message || ""}
        isLoading={isLoadingChapters}
        success={chaptersResponse?.success || false}
        taskRefId={task_ref_id || ""}
        taskProgressId={progress_id || ""}
        pillar={pillar || ""}
      />
    </div>
  );
};

export default ChapterProgressHolder;