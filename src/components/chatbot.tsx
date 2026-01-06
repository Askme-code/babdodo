'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chat } from '@/ai/flows/chatbot-flow';
import { cn } from '@/lib/utils';
import { useTypewriter } from '@/hooks/use-typewriter';


type Message = {
    role: 'user' | 'model';
    content: {text: string}[];
};

const ChatBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';
    const animatedResponse = useTypewriter(message.content[0].text, 20);

    return (
        <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
             {!isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div className={cn(
                "max-w-xs md:max-w-md rounded-lg px-4 py-2",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
                <p className="text-sm">{isUser ? message.content[0].text : animatedResponse}</p>
            </div>
            {isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isOpen && messages.length === 0){
             setMessages([{ role: 'model', content: [{text: "Hello! I'm Dodo, your friendly guide. How can I help you plan your adventure with Babdodo Tours & Safaris?"}] }]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage: Message = { role: 'user', content: [{text: input}] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chat({
                message: input,
                history: messages
            });
            const botMessage: Message = { role: 'model', content: [{text: result.response}] };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
             const errorMessage: Message = { role: 'model', content: [{text: "Sorry, I'm having a little trouble connecting right now. Please try again in a moment."}] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-lg"
            >
                {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
            </Button>

            {isOpen && (
                <Card className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] flex flex-col shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Dodo The Guide</h3>
                                <p className="text-xs text-muted-foreground">Online</p>
                            </div>
                         </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-4">
                        <ScrollArea className="h-full" ref={scrollAreaRef as any}>
                           <div className="space-y-4 pr-4">
                             {messages.map((msg, index) => (
                                <ChatBubble key={index} message={msg} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                     <div className="bg-muted px-4 py-2 rounded-lg text-sm">Typing...</div>
                                </div>
                            )}
                           </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                         <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about tours..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
