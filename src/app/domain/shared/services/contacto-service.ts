import { Injectable } from '@angular/core';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  time: Date;
}

export interface FAQ {
  keywords: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root'
})


export class ContactoService {

  private faqs: FAQ[] = [
    {
      keywords: ['horario', 'hora', 'abierto', 'cierra', 'abre'],
      answer: '🕐 Nuestro horario es de Lunes a Sábado de 9am a 7pm y Domingos de 10am a 4pm.'
    },
    {
      keywords: ['domicilio', 'envío', 'envio', 'delivery', 'entrega'],
      answer: '🚚 Sí hacemos domicilios dentro de la ciudad. El pedido mínimo es de $20.000 y el domicilio tiene un costo de $3.000.'
    },
    {
      keywords: ['pago', 'pagar', 'efectivo', 'transferencia', 'nequi', 'daviplata', 'tarjeta'],
      answer: '💳 Aceptamos efectivo, Nequi, Daviplata y transferencias bancarias.'
    },
    {
      keywords: ['producto', 'productos', 'venden', 'tienen', 'catalogo', 'catálogo'],
      answer: '🛒 Tenemos bebidas, confitería, snacks, cigarrillos y mucho más. Puedes ver el catálogo completo en la sección de productos.'
    },
    {
      keywords: ['ubicacion', 'ubicación', 'donde', 'dónde', 'dirección', 'direccion', 'local'],
      answer: '📍 Nos encontramos en el centro de la ciudad. Puedes ver nuestra ubicación exacta en la sección "Ubicación" del menú.'
    },
    {
      keywords: ['telefono', 'teléfono', 'contacto', 'llamar', 'whatsapp'],
      answer: '📞 Puedes contactarnos al WhatsApp o llamarnos al +57 300 000 0000.'
    },
    {
      keywords: ['precio', 'precios', 'costo', 'vale', 'cuanto', 'cuánto'],
      answer: '💰 Los precios varían según el producto. Te invitamos a explorar nuestro catálogo donde cada producto tiene su precio actualizado.'
    },
    {
      keywords: ['pedido', 'pedir', 'comprar', 'orden'],
      answer: '🛍️ Puedes hacer tu pedido directamente desde nuestra tienda en línea. Solo agrega los productos al carrito y sigue el proceso de compra.'
    },
  ];

  private defaultAnswer = '🤔 No entendí tu pregunta. Puedes preguntar sobre horarios, domicilios, pagos, productos o ubicación. ¡Estoy aquí para ayudarte!';

  getResponse(input: string): string {
    const text = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (const faq of this.faqs) {
      if (faq.keywords.some(k => text.includes(k))) {
        return faq.answer;
      }
    }
    return this.defaultAnswer;
  }

  getWelcomeMessage(): Message {
    return {
      text: '👋 ¡Hola! Soy el asistente de La Monarca. ¿En qué te puedo ayudar? Puedes preguntarme sobre horarios, domicilios, pagos o productos.',
      sender: 'bot',
      time: new Date()
    };
  }

  getSuggestions(): string[] {
    return ['¿Cuál es el horario?', '¿Hacen domicilios?', '¿Cómo puedo pagar?', '¿Dónde están ubicados?'];
  }
  
}
