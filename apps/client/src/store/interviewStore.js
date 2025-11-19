import { create } from 'zustand';

const MOCK_QUESTIONS = [
  "Tell me about yourself and your background.",
  "What is your greatest strength as a developer?",
  "Describe a challenging bug you fixed recently.",
  "Where do you see yourself in 5 years?",
  "Do you have any questions for us?"
];

export const useInterviewStore = create((set, get) => ({
  status: 'idle', // idle | listening | processing | speaking | completed
  currentQuestionIndex: 0,
  
  // ACTIONS
  startInterview: () => {
    set({ status: 'processing', currentQuestionIndex: 0 });
    
    // Simulate AI loading -> AI Starts Speaking
    setTimeout(() => {
      set({ status: 'speaking' });
      
      // Simulate AI speaking time (3 seconds)
      setTimeout(() => {
        set({ status: 'listening' }); // Now it's user's turn
      }, 3000); 
    }, 1500);
  },

  userFinishedSpeaking: () => {
    set({ status: 'processing' });

    // Simulate AI thinking
    setTimeout(() => {
      const nextIndex = get().currentQuestionIndex + 1;
      
      // Check if we are done with all questions
      if (nextIndex >= MOCK_QUESTIONS.length) {
        set({ status: 'completed' });
      } else {
        // Move to next question
        set({ 
          status: 'speaking', 
          currentQuestionIndex: nextIndex 
        });
        
        // Simulate AI speaking the next question
        setTimeout(() => {
          set({ status: 'listening' });
        }, 3000); 
      }
    }, 2000);
  },
  
  endInterview: () => set({ status: 'idle', currentQuestionIndex: 0 })
}));