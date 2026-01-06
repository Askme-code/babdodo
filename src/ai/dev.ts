'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/content-recommendations.ts';
import '@/ai/flows/chatbot-flow.ts';
