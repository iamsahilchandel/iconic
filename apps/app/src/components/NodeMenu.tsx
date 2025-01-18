"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { cn } from "../lib/utils";

type NodeMenuProps = {
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function NodeMenu({ className, onEdit, onDelete }: NodeMenuProps) {
  return (
    <div className={cn("absolute -top-10 left-0 w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2 flex items-center justify-end gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="h-7 px-2 text-white/70 hover:text-white hover:bg-transparent"
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-white/70 hover:text-white hover:bg-transparent"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black/40 backdrop-blur-xl border-white/10 px-2 py-1 !top-0 !left-0 !w-[12rem]">
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-500 text-xs focus:text-red-500 focus:bg-red-500/10 rounded-sm"
          >
            <Trash className="h-2 w-2 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}