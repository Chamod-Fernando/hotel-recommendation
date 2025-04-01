import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

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

  constructor(public dialogRef: MatDialogRef<ChatbotComponent>) {}

  async sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userInput = this.userMessage;
    this.userMessage = '';
    this.isLoading = true;

    try {
      // Use Puter.js for AI response
      const response = await (window as any).puter.ai.chat(userInput);
      const botReply = response || 'Sorry, I didn’t understand that.';

      this.messages.push({ text: botReply, sender: 'bot' });
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
