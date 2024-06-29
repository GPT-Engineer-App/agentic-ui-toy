import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Plus } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import Container from "@/components/ui/container";
import ReactFlow, { MiniMap, Controls, Background, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const randomNames = [
  "Agent Alpha",
  "Agent Bravo",
  "Agent Charlie",
  "Agent Delta",
  "Agent Echo",
];

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const addAgent = () => {
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const newAgent = { id: `${nodes.length}`, data: { label: name }, position: { x: Math.random() * 250, y: Math.random() * 250 } };
    setNodes((nds) => [...nds, newAgent]);
  };

  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  return (
    <Container className="max-w-[812px] mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Manage AI Agents</h1>
        <div className="flex space-x-2">
          <Button onClick={toggleTheme} variant="outline">
            {theme === "light" ? <Moon className="mr-1 w-4 h-4" /> : <Sun className="mr-1 w-4 h-4" />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
          <Button
            onClick={addAgent}
            className="rounded-full bg-blue-500 text-white p-4 shadow-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onLoad={setReactFlowInstance}
          style={{ width: '100%', height: '100%' }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </Container>
  );
};

export default Index;