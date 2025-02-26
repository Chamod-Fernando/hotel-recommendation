import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the SDK
import { environment } from '../../environment/Environment.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  isLoading = false;
  private API_KEY = 'AIzaSyDaYOh9CNJBs668as_9IaLyadIGGQ1M-Jc';

  constructor(public dialogRef: MatDialogRef<ChatbotComponent>) {}

  async sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userInput = this.userMessage;
    this.userMessage = '';
    this.isLoading = true;

    try {
      const genAI = new GoogleGenerativeAI(this.API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // ✅ Fixing response handling
      const chat = await model.generateContent(userInput);
      const response = await chat.response; // Await the response
      const botReply = response.text(); // Extract text properly

      this.messages.push({
        text: botReply || 'Sorry, I didn’t understand that.',
        sender: 'bot',
      });
    } catch (error) {
      console.error('API Error:', error);
      this.messages.push({
        text: 'Error connecting to AI. Try again later.',
        sender: 'bot',
      });
    } finally {
      this.isLoading = false;
    }
  }

  closeChat() {
    this.dialogRef.close();
  }
}
