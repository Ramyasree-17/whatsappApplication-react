import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  chatList: [
    {
      id: 1,
      name: "Ramya",
      lastMessage: "Hi Ramya",
      time: "10:00 AM",
      unread: 0
    },
    {
      id: 2,
      name: "Aditya",
      lastMessage: "Hello",
      time: "9:30 AM",
      unread: 1
    },
    {
      id: 3,
      name: "Kiran",
      lastMessage: "Meeting at 5",
      time: "8:45 AM",
      unread: 1
    },
    {
      id: 4,
      name: "Teja",
      lastMessage: "Send files",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 5,
      name: "Priya",
      lastMessage: "Call me",
      time: "Yesterday",
      unread: 1
    },
    {
      id: 6,
      name: "Rahul",
      lastMessage: "Where are you?",
      time: "11:20 AM",
      unread: 1
    },
    {
      id: 7,
      name: "Sneha",
      lastMessage: "Ok 👍",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 8,
      name: "Vamsi",
      lastMessage: "Let's go",
      time: "12:10 PM",
      unread: 1
    }
  ],

  // MESSAGES
  messages: {
    1: [
      { text: "Hi Ramya", time: "10:00 AM", sender: "me", date: "Today" }
    ],
    2: [
      { text: "Hello", time: "9:30 AM", sender: "other", date: "Today" }
    ],
    3: [
      { text: "Meeting at 5", time: "8:45 AM", sender: "other", date: "Today" }
    ],
    4: [
      { text: "Send files", time: "Yesterday", sender: "me", date: "Yesterday" }
    ],
    5: [
      { text: "Call me", time: "Yesterday", sender: "other", date: "Yesterday" }
    ],
    6: [
      { text: "Where are you?", time: "11:20 AM", sender: "other", date: "Today" }
    ],
    7: [
      { text: "Ok 👍", time: "Yesterday", sender: "me", date: "Yesterday" }
    ],
    8: [
      { text: "Let's go", time: "12:10 PM", sender: "other", date: "Today" }
    ]
  },

  selectedChatId: 1,
  selectedChannelId: null,
  activeTab: "chats",

  // ✅ CHANNELS (unchanged)
  channels: [
  {
    id: 1,
    name: "Tech News",
    followed: true,
    posts: [
      { id: 1, text: "React update 🔥" },
      { id: 2, text: "AI is growing 🤖" },
      { id: 3, text: "New iPhone launched 📱" },
      { id: 4, text: "ChatGPT new version 🚀" },
      { id: 5, text: "Cloud computing boom ☁️" }
    ]
  },
  {
    id: 2,
    name: "Sports",
    followed: false,
    posts: [
      { id: 1, text: "India won 🏏" },
      { id: 2, text: "IPL updates 🏆" },
      { id: 3, text: "Football news ⚽" }
    ]
  },
  {
    id: 3,
    name: "Movies",
    followed: false,
    posts: [
      { id: 1, text: "New movie released 🎬" },
      { id: 2, text: "Top 10 movies 🍿" }
    ]
  }
]
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChannel: (state, action) => {
  state.selectedChannelId = action.payload;
},

    // ✅ SELECT CHAT
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;

      const chat = state.chatList.find(c => c.id === action.payload);
      if (chat) chat.unread = 0;
    },

    // ✅ SEND MESSAGE
    sendMessage: (state, action) => {
      const { chatId, text, time } = action.payload;

      // safety check
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push({
        text,
        time,
        sender: "me",
        date: "Today"
      });

      const chat = state.chatList.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessage = text;
        chat.time = time;
      }
    },

    // ✅ RECEIVE MESSAGE (simulate incoming)
    receiveMessage: (state, action) => {
      const { chatId, text, time } = action.payload;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push({
        text,
        time,
        sender: "other",
        date: "Today"
      });

      const chat = state.chatList.find(c => c.id === chatId);

      if (chat) {
        chat.lastMessage = text;
        chat.time = time;

        if (state.selectedChatId !== chatId) {
          chat.unread += 1;
        }
      }
    },

    // ✅ TAB SWITCH
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    // ✅ CHANNEL SELECT
    setSelectedChannel: (state, action) => {
      state.selectedChannelId = action.payload;
    },

    // ✅ FOLLOW / UNFOLLOW
    toggleFollow: (state, action) => {
      const channel = state.channels.find(c => c.id === action.payload);

      if (channel) {
        channel.followed = !channel.followed;
      }

      state.channels.sort((a, b) => b.followed - a.followed);
    }
  }
});

export const {
  selectChat,
  sendMessage,
  receiveMessage,
  setActiveTab,
  toggleFollow,
  setSelectedChannel
} = chatSlice.actions;

export default chatSlice.reducer;