import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { Youtube, Trash } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Separator } from "@repo/ui/separator";
import { Input } from "@repo/ui/input";

type YouTubeNodeProps = {
  id: string;
};

export function YouTubeNode({ id }: YouTubeNodeProps) {
  const { deleteElements } = useReactFlow();

  const onDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl w-80">
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <Youtube className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-medium text-white">YouTube Content</h3>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white/70 hover:text-red-500 hover:bg-transparent"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-white/70 px-4">Enter a YouTube video URL or ID to analyze its content</p>

        <Separator />

        <div className="p-4">
          <Input
            className="bg-[#1a1a1a] !rounded-lg p-3 text-sm text-white/70"
            placeholder="Enter a YouTube video URL"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !top-[80%]" />
    </div>
  );
}
