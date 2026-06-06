import { Component,OnInit, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService, Message } from '../shared/services/contacto-service';

@Component({
  selector: 'app-contacto',
  standalone:true,
  imports:[CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {

   @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  // ── Signals ──────────────────────────────────────────
  isOpen      = signal(false);
  isTyping    = signal(false);
  userInput   = signal('');
  messages    = signal<Message[]>([]);
  suggestions = signal<string[]>([]);

  // Computed: deshabilita el botón si el input está vacío
  canSend = computed(() => this.userInput().trim().length > 0);

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.messages.set([this.contactoService.getWelcomeMessage()]);
    this.suggestions.set(this.contactoService.getSuggestions());
  }

  toggleChat(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(text?: string): void {
    const message = text || this.userInput().trim();
    if (!message) return;

    // Agrega mensaje del usuario
    this.messages.update(msgs => [...msgs, { text: message, sender: 'user', time: new Date() }]);
    this.userInput.set('');
    this.suggestions.set([]);
    this.isTyping.set(true);

    setTimeout(() => this.scrollToBottom(), 50);

    // Respuesta del bot
    setTimeout(() => {
      const response = this.contactoService.getResponse(message);
      this.messages.update(msgs => [...msgs, { text: response, sender: 'bot', time: new Date() }]);
      this.isTyping.set(false);
      this.suggestions.set(this.contactoService.getSuggestions());
      setTimeout(() => this.scrollToBottom(), 50);
    }, 800);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendMessage();
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }

}
