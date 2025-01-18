import { Button } from "@repo/ui/button";
import { Youtube, Type, FileText, Globe, MessageSquare } from "lucide-react";
import { DragEvent, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";

type DockMenuProps = {
  onInsertItem: (type: string) => void;
};

export function DockMenu({ onInsertItem }: DockMenuProps) {
  const menuItems = [
    {
      nodeType: "youtube",
      icon: Youtube,
    },
    {
      nodeType: "textbox",
      icon: Type,
    },
    {
      nodeType: "pdf",
      icon: FileText,
    },
    {
      nodeType: "website",
      icon: Globe,
    },
    {
      nodeType: "chat",
      icon: MessageSquare,
    },
  ];

  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-xl bg-black/30 backdrop-blur-xl border border-white/10"
    >
      {menuItems.map((item) => (
        <DockMenuButton
          key={item.nodeType}
          nodeType={item.nodeType}
          onInsertItem={onInsertItem}
          mouseX={mouseX}
        >
          <item.icon className="h-5 w-5" />
        </DockMenuButton>
      ))}
    </motion.div>
  );
}

function DockMenuButton({
  children,
  onInsertItem,
  nodeType,
  mouseX,
}: {
  children: React.ReactNode;
  onInsertItem: (type: string) => void;
  nodeType: string;
  mouseX: MotionValue<number>;
}) {
  const onDragStart = (
    event: DragEvent<HTMLButtonElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-white/10 rounded-full"
      onClick={() => onInsertItem(nodeType)}
      draggable
      onDragStart={(e) => onDragStart(e, nodeType)}
    >
      {children}
    </Button>
  );
}
