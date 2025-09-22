import React from "react";

export default function PastelSpinner({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-pastel4 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-white drop-shadow-lg">
          {message || "✨ Creating your profile..."}
        </p>
      </div>
    </div>
  );
}
