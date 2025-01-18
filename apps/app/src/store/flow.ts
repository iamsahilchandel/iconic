import { atom } from "recoil";
import { Node, Edge } from "@xyflow/react";

const FLOW_STORAGE_KEY = "canvas-flow-state";
const AI_SETTINGS_KEY = "ai-settings-state";

type AISettings = {
  [nodeId: string]: {
    model: string;
  };
};

export const nodesState = atom<Node[]>({
  key: "nodesState",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;

      const savedFlow = localStorage.getItem(FLOW_STORAGE_KEY);
      if (savedFlow) {
        const { nodes } = JSON.parse(savedFlow);
        setSelf(nodes);
      }

      onSet((newNodes) => {
        const savedFlow = localStorage.getItem(FLOW_STORAGE_KEY);
        const edges = savedFlow ? JSON.parse(savedFlow).edges : [];
        localStorage.setItem(
          FLOW_STORAGE_KEY,
          JSON.stringify({ nodes: newNodes, edges })
        );
      });
    },
  ],
});

export const edgesState = atom<Edge[]>({
  key: "edgesState",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;

      const savedFlow = localStorage.getItem(FLOW_STORAGE_KEY);
      if (savedFlow) {
        const { edges } = JSON.parse(savedFlow);
        setSelf(edges);
      }

      onSet((newEdges) => {
        const savedFlow = localStorage.getItem(FLOW_STORAGE_KEY);
        const nodes = savedFlow ? JSON.parse(savedFlow).nodes : [];
        localStorage.setItem(
          FLOW_STORAGE_KEY,
          JSON.stringify({ nodes, edges: newEdges })
        );
      });
    },
  ],
});

export const aiSettingsState = atom<AISettings>({
  key: "aiSettingsState",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === "undefined") return;

      const savedSettings = localStorage.getItem(AI_SETTINGS_KEY);
      if (savedSettings) {
        setSelf(JSON.parse(savedSettings));
      }

      onSet((newSettings) => {
        localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(newSettings));
      });
    },
  ],
});

export const flowLoadedState = atom<boolean>({
  key: "flowLoadedState",
  default: false,
  effects: [
    ({ setSelf }) => {
      if (typeof window === "undefined") return;
      setSelf(true);
    },
  ],
});
