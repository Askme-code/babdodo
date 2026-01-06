
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Bot } from 'lucide-react';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);


export default function HelpFAB() {
    const [isFabOpen, setIsFabOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleFab = () => {
        // If chatbot is open, clicking the FAB should close it.
        if (isChatbotOpen) {
            setIsChatbotOpen(false);
            setIsFabOpen(false); // also close the FAB menu
        } else {
            setIsFabOpen(!isFabOpen);
        }
    };
    
    const openChatbot = () => {
        setIsChatbotOpen(true);
        setIsFabOpen(false); // Close the FAB menu when chatbot opens
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* The main floating action button */}
            <div className="flex flex-col items-center gap-2">
                 {isFabOpen && (
                    <div className="flex flex-col items-center gap-2">
                        {/* WhatsApp Button */}
                        <WhatsAppButton />
                        {/* Chatbot Button */}
                        <Button
                            onClick={openChatbot}
                            className="rounded-full h-14 w-auto px-4 shadow-lg bg-primary hover:bg-primary/90 flex items-center gap-2"
                        >
                            <Bot className="h-6 w-6 text-primary-foreground" />
                            <span className="font-semibold">Chat with Dodo</span>
                        </Button>
                    </div>
                )}
                <Button
                    onClick={toggleFab}
                    className="rounded-full h-16 w-auto px-4 shadow-lg bg-primary hover:bg-primary/90 flex items-center gap-2"
                    aria-expanded={isFabOpen}
                >
                    {isFabOpen || isChatbotOpen ? <X className="h-8 w-8" /> : <HelpIcon />}
                    <span className="font-semibold text-lg">{isFabOpen || isChatbotOpen ? '' : 'Need Help?'}</span>
                </Button>
            </div>
            
            {/* The Chatbot window, controlled by this component */}
            <Chatbot isOpen={isChatbotOpen} onOpenChange={setIsChatbotOpen} />
        </div>
    );
}
