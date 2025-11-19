import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  // --- STATE ---
  
  // The status of the Voice Agent on the dashboard
  creationStatus: 'idle', // 'idle' | 'listening' | 'processing'
  
  // DUMMY DATA (This mimics your future Firestore collection)
  generatedInterviews: [
    { 
      id: 'mock_1', 
      title: 'Senior React Developer', 
      date: '2 days ago', 
      status: 'Completed', 
      score: '8.5/10',
      type: 'Technical'
    },
    { 
      id: 'mock_2', 
      title: 'System Design: Uber', 
      date: '5 days ago', 
      status: 'Pending', 
      score: '-',
      type: 'Architecture'
    },
    { 
      id: 'mock_3', 
      title: 'Behavioral & Leadership', 
      date: '1 week ago', 
      status: 'Completed', 
      score: '9.2/10',
      type: 'HR'
    },
  ],

  // --- ACTIONS ---

  // 1. Start the Voice Input
  startVoiceCommand: () => {
    set({ creationStatus: 'listening' });
  },

  // 2. Process the Voice Input (Mocking the API call)
  processVoiceCommand: () => {
    set({ creationStatus: 'processing' });
    
    // Simulate API Delay (Wait for AI to "Generate" the questions)
    setTimeout(() => {
      const newDummyInterview = {
        id: `mock_${Date.now()}`,
        title: 'Custom Generated Session', // In real app, this comes from the user's voice input
        date: 'Just Now',
        status: 'Pending',
        score: '-',
        type: 'Custom'
      };

      // Add the new interview to the top of the list
      set((state) => ({
        generatedInterviews: [newDummyInterview, ...state.generatedInterviews],
        creationStatus: 'idle' // Reset the agent
      }));

      // TODO: Later, replace the set() above with:
      // await addDoc(collection(db, "interviews"), newDummyInterview);
      
    }, 2000); // 2 second delay to feel "real"
  }
}));