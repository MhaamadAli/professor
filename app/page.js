'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
          },
        },
      },
    },
  },
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.content += text;
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].content = "Sorry, there was an error processing your request.";
        return updatedMessages;
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            height: '80vh', 
            display: 'flex', 
            flexDirection: 'column', 
            p: 2, 
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Rate My Professor Chat
          </Typography>
          <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2, px: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
                  mb: 2,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: msg.role === 'assistant' ? 'primary.light' : 'secondary.light',
                    color: msg.role === 'assistant' ? 'primary.contrastText' : 'secondary.contrastText',
                    maxWidth: '70%',
                    borderRadius: msg.role === 'assistant' ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                  }}
                >
                  <Typography variant="body1">{msg.content}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{ mr: 1 }}
            />
            {isMobile ? (
              <IconButton color="primary" onClick={sendMessage} sx={{ p: '10px' }}>
                <SendIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                endIcon={<SendIcon />}
                sx={{ minWidth: '100px' }}
              >
                Send
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}



/*

'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// ... (keep the theme creation and other parts of the component unchanged)

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.content += text;
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].content = "Sorry, there was an error processing your request.";
        return updatedMessages;
      });
    }
  };

  // ... (keep the return statement and the rest of the component unchanged)
}








*/