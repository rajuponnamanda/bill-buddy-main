<!-- ChatBot.vue
<template>
    <div>
      <div v-for="message in messages" :key="message.id" class="message" :class="{ 'user-message': message.type === 'user', 'bot-message': message.type === 'bot' }">
        {{ message.text }}
      </div>
      <div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ChatBot',
    setup() {
      const messages = ref([]);
  
      const sendMessage = () => {
        if (newMessage.trim() === '') return;
  
        messages.push({ text: newMessage, id: messages.length, type: 'user' });
        newMessage.value = '';
  
        const botResponse = getBotResponse(newMessage);
  
        messages.push({ text: botResponse, id: messages.length, type: 'bot' });
      };
  
      const getBotResponse = (userMessage) => {
        return `Bot: I received your message: "${userMessage}"`;
      };
  
      return {
        messages,
        newMessage,
        sendMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  .message {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .user-message {
    background-color: #3498db;
    color: #fff;
    align-self: flex-end;
  }
  
  .bot-message {
    background-color: #e0e0e0;
  }
  </style>
   -->
   <template>
    <div>
   
    </div>
   </template>
   
   <script setup lang="ts">
   
   </script>
   
   <style scoped>
   
   </style>