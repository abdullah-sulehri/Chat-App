const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} items-start`}
        >
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full bg-zinc-300 animate-pulse" />
          </div>

          {/* Sender Name (Optional) */}
          <div className="chat-header mb-1">
            <div className="h-4 w-20 bg-zinc-300 rounded animate-pulse" />
          </div>

          {/* Message Bubble */}
          <div className="chat-bubble bg-base-200 p-0">
            <div className="h-16 w-[200px] rounded-md bg-zinc-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
