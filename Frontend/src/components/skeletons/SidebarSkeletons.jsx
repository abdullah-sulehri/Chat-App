import { Users } from "lucide-react";

const SidebarSkeletons = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-zinc-400 animate-pulse" />
          <span className="font-medium hidden lg:block text-zinc-400 animate-pulse">
            Loading Contacts...
          </span>
        </div>
      </div>

      {/* Skeleton List */}
      <div className="overflow-y-auto w-full py-3 space-y-2">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full px-4 py-2 flex items-center gap-4 animate-pulse hover:bg-base-200 transition-colors"
          >
            {/* Avatar Circle */}
            <div className="flex-shrink-0 w-12 h-12 bg-zinc-300 rounded-full" />

            {/* Name & Status (Desktop Only) */}
            <div className="hidden lg:flex flex-col gap-2 w-full">
              <div className="bg-zinc-300 h-4 w-3/4 rounded-md" />
              <div className="bg-zinc-200 h-3 w-1/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeletons;
