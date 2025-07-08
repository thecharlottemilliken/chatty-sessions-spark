
import React, { useState } from 'react';
import { Send, Plus, MessageSquare, Settings, PanelLeft, PanelLeftClose, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);
  
  const [sessions] = useState<ChatSession[]>([
    { id: '1', title: 'Team Roles & Responsibilities', lastMessage: 'What are the key responsibilities of a Technical Lead?', timestamp: '2 hours ago' },
    { id: '2', title: 'Epic Breakdown Session', lastMessage: 'Break down this checkout flow into manageable user stories', timestamp: '1 day ago' },
    { id: '3', title: 'Finding React Expert', lastMessage: 'Who in our team has advanced React and TypeScript skills?', timestamp: '3 days ago' },
    { id: '4', title: 'Design Thinking Workshop', lastMessage: 'Set up a problem definition workshop for our mobile app', timestamp: '1 week ago' },
  ]);

  const promptSuggestions = [
    {
      title: "New Employee Onboarding",
      description: "Help me understand the organization structure and team setup",
      icon: "👋"
    },
    {
      title: "User Story Generation", 
      description: "Turn this screenshot into user stories based on our guidelines",
      icon: "📋"
    },
    {
      title: "Find Domain Expert",
      description: "Help me find someone with specific domain knowledge",
      icon: "🔍"
    },
    {
      title: "Workshop Template",
      description: "Get a brainstorming session template for my team",
      icon: "💡"
    }
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: currentMessage,
        isUser: true
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to help you with that! Let me provide you with a thoughtful response.",
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handlePromptClick = (prompt: typeof promptSuggestions[0]) => {
    setCurrentMessage(prompt.description);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Chat Sessions</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-3 mb-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg p-2 text-white group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{session.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{session.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{session.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-100">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BRF Chat
            </h1>
          </div>
        </div>

        {/* Chat Messages or Welcome Screen */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="text-center mb-12 max-w-2xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Hey there! 👋
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Ready to have an amazing conversation?
                </p>
                <p className="text-gray-500">
                  I'm here to help with anything you need - just ask away!
                </p>
              </div>

              {/* Prompt Suggestions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mb-8">
                {promptSuggestions.map((prompt, index) => (
                  <div
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 cursor-pointer hover:bg-white/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {prompt.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm">{prompt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Chat Messages
            <ScrollArea className="h-full p-6">
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : 'bg-white shadow-md text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4 items-end">
              <div className="flex-1 relative">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message here... 💭"
                  className="pr-12 py-3 text-lg rounded-2xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
