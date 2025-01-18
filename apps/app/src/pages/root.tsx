import { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DockMenu } from "../components/DockMenu";
import { YouTubeNode } from "../components/nodes/YouTubeNode";
import { TextBoxNode } from "../components/nodes/TextBoxNode";
import { PDFNode } from "../components/nodes/PDFNode";
import { WebsiteNode } from "../components/nodes/WebsiteNode";
import { ChatNode } from "../components/nodes/ChatNode";
import { nodesState, edgesState, flowLoadedState } from "../store/flow";

const nodeTypes = {
  youtubeNode: YouTubeNode,
  textboxNode: TextBoxNode,
  pdfNode: PDFNode,
  websiteNode: WebsiteNode,
  chatNode: ChatNode,
};

export default function Root() {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);
  const [isLoaded] = useRecoilState(flowLoadedState);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleInsertItem = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: `${type}Node`,
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: { label: `${type} node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document
        .querySelector(".react-flow")
        ?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type || !reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: `${type}Node`,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  if (!isLoaded) return null;

  return (
    <div className="h-screen w-full relative bg-[hsl(var(--background))]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="dark"
      >
        <Background color="hsl(var(--muted))" />
        <Controls />
        <MiniMap style={{ background: "hsl(var(--card))" }} />
      </ReactFlow>
      <DockMenu onInsertItem={handleInsertItem} />
    </div>
  );
}
