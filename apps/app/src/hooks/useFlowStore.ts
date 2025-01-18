"use client";

import { Node, Edge } from '@xyflow/react'
import { useCallback, useEffect, useState } from 'react'

const FLOW_STORAGE_KEY = 'canvas-flow-state'
const AI_SETTINGS_KEY = 'ai-settings-state'

type FlowState = {
  nodes: Node[]
  edges: Edge[]
}

type AISettings = {
  [nodeId: string]: {
    model: string
  }
}

export function useFlowStore() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [aiSettings, setAISettings] = useState<AISettings>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load initial state
  useEffect(() => {
    try {
      const flowState = localStorage.getItem(FLOW_STORAGE_KEY)
      const aiState = localStorage.getItem(AI_SETTINGS_KEY)

      if (flowState) {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(flowState)
        setNodes(savedNodes)
        setEdges(savedEdges)
      }

      if (aiState) {
        setAISettings(JSON.parse(aiState))
      }
    } catch (error) {
      console.error('Error loading flow state:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save state on changes
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify({ nodes, edges }))
    } catch (error) {
      console.error('Error saving flow state:', error)
    }
  }, [nodes, edges, isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(aiSettings))
    } catch (error) {
      console.error('Error saving AI settings:', error)
    }
  }, [aiSettings, isLoaded])

  const updateAISettings = useCallback((nodeId: string, settings: { model: string }) => {
    setAISettings(prev => ({
      ...prev,
      [nodeId]: settings
    }))
  }, [])

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    aiSettings,
    updateAISettings,
    isLoaded
  }
} 