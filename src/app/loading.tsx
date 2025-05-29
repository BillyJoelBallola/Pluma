import { LoaderCircle } from "lucide-react";

export default function loading() {
  return (
    <div className="w-dvw h-dvh grid place-items-center bg-gray-900/10">
      <LoaderCircle className="animate-spin size-24" />
    </div>
  );
}
