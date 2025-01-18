import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Label } from "@repo/ui/label";
import { Button } from "@repo/ui/button";

type ChatSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
};

export function ChatSettingsDialog({
  open,
  onOpenChange,
  selectedModel,
  onModelChange,
}: ChatSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/20 backdrop-blur-2xl border border-white/10 !rounded-xl !shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-white/90">
            AI Assistant Settings
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="model" className="text-white">
              Model
            </Label>
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger
                id="model"
                className="bg-transparent text-white border-white/10 !rounded-lg"
              >
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-black/70 backdrop-blur-lg border-white/10 rounded-lg">
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="gemini-pro-vision">
                  Gemini Pro Vision
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-white/20 text-white/90 hover:bg-white/10 hover:text-white transition-colors !rounded-lg"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false);
            }}
            className="bg-white/10 text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-sm transition-colors !rounded-lg"
          >
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
