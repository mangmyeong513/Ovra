// src/components/QuoteModal.tsx
import { useEffect, useState } from "react";

type TargetPost = { id: string; content: string };

export default function QuoteModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [target, setTarget] = useState<TargetPost | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${encodeURIComponent(postId)}`)
      .then((r) => r.json())
      .then(setTarget)
      .catch(() => {});
  }, [postId]);

  async function submit() {
    const res = await fetch(`/api/posts/${encodeURIComponent(postId)}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    if (res.ok) onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
      <div className="w-[640px] max-w-[90vw] rounded-2xl bg-[#141414] border border-white/10 p-4">
        <div className="mb-3 text-sm text-neutral-400">옴표 작성</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내 코멘트를 적어주세요"
          className="w-full h-28 resize-none rounded-xl bg-black/30 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
        />
        {target && (
          <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-sm">
            <div className="opacity-70 mb-1">원문 미리보기</div>
            <div className="whitespace-pre-wrap">{target.content}</div>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-white/10"
          >
            취소
          </button>
          <button
            onClick={submit}
            className="px-3 py-2 rounded-lg bg-blue-500/80 hover:bg-blue-500"
          >
            게시
          </button>
        </div>
      </div>
    </div>
  );
}
