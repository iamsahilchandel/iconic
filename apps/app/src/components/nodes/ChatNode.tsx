"use client";

import { Handle, Position } from "@xyflow/react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useCallback, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { ChatSettingsDialog } from "../dialogs/ChatSettingsDialog";
import { useRecoilState } from "recoil";
import { aiSettingsState } from "../../store/flow";
import { NodeMenu } from "../NodeMenu";

type ChatNodeProps = {
  id: string;
  selected?: boolean;
};

export function ChatNode({ id, selected }: ChatNodeProps) {
  const { deleteElements } = useReactFlow();
  const [aiSettings, setAISettings] = useRecoilState(aiSettingsState);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    aiSettings[id]?.model || "gemini-pro"
  );

  const onDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setAISettings((prev) => ({
      ...prev,
      [id]: { model },
    }));
  };

  return (
    <>
      <div className="relative">
        {selected && (
          <NodeMenu
            className="z-50 absolute -top-14 inset-x-0"
            onEdit={() => setIsSettingsOpen(true)}
            onDelete={onDelete}
          />
        )}

        <div
          className={`bg-black/30 backdrop-blur-xl border ${
            selected ? "border-white" : "border-white/10"
          } rounded-xl min-w-80 overflow-hidden transition-colors duration-200`}
        >
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-white/70" />
                <div className="text-sm font-medium text-white">
                  AI Assistant
                </div>
              </div>
              <div className="flex items-center gap-1"></div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="min-h-[200px] text-sm text-white/70">
              Ready to assist with your questions...
            </div>
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-2">
              <Input
                placeholder="Message ChatGPT..."
                className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-white/40"
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Handle
            type="target"
            position={Position.Left}
            className="!w-2 !h-2"
          />
        </div>
      </div>

      <ChatSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
    </>
  );
}
