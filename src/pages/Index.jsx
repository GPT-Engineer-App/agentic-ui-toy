import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash, Edit, Move, Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import Container from "@/components/ui/container";

const agentTemplates = [
  "Help decide on how to approach homework",
  "Provide a summary of a document",
  "Generate a creative story",
];

const randomNames = [
  "Agent Alpha",
  "Agent Bravo",
  "Agent Charlie",
  "Agent Delta",
  "Agent Echo",
];

const Index = () => {
  const [agents, setAgents] = useState([]);
  const [newAgentPrompt, setNewAgentPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const { theme, toggleTheme } = useTheme();

  const addAgent = () => {
    const prompt = newAgentPrompt.trim() || selectedTemplate || agentTemplates[Math.floor(Math.random() * agentTemplates.length)];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    if (prompt) {
      setAgents([...agents, { name, prompt }]);
      setNewAgentPrompt("");
      setSelectedTemplate("");
    }
  };

  const deleteAgent = (index) => {
    const updatedAgents = agents.filter((_, i) => i !== index);
    setAgents(updatedAgents);
  };

  const editAgent = (index, newPrompt) => {
    const updatedAgents = agents.map((agent, i) =>
      i === index ? { ...agent, prompt: newPrompt } : agent
    );
    setAgents(updatedAgents);
  };

  const reorderAgents = (startIndex, endIndex) => {
    const result = Array.from(agents);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setAgents(result);
  };

  return (
    <Container className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Manage AI Agents</h1>
        <Button onClick={toggleTheme} variant="outline">
          {theme === "light" ? <Moon className="mr-2" /> : <Sun className="mr-2" />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
      <div className="mb-4">
        <Label htmlFor="agent-prompt">New Agent Prompt</Label>
        <Textarea
          id="agent-prompt"
          value={newAgentPrompt}
          onChange={(e) => setNewAgentPrompt(e.target.value)}
          placeholder="Enter agent prompt here..."
          className="mb-2"
        />
        <Select onValueChange={setSelectedTemplate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a template..." />
          </SelectTrigger>
          <SelectContent>
            {agentTemplates.map((template, index) => (
              <SelectItem key={index} value={template}>
                {template}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        {agents.map((agent, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={agent.prompt}
                onChange={(e) => editAgent(index, e.target.value)}
                className="mb-2"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" onClick={() => deleteAgent(index)}>
                      <Trash className="mr-2" /> Delete
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete this agent</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline">
                      <Edit className="mr-2" /> Edit
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit this agent</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline">
                      <Move className="mr-2" /> Reorder
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reorder this agent</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button
        onClick={addAgent}
        className="fixed bottom-4 right-4 rounded-full bg-blue-500 text-white p-4 shadow-lg hover:bg-blue-600"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </Container>
  );
};

export default Index;