import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { S } from '../styles';
import { Avatar, Button } from '../components/UI';
import Icon from '../components/Icons';
import { api } from '../api';

const MessagesPage = ({ members, activeChat, setActiveChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock sample messages for testing
  const mockMessages = [
    { id: 1, senderId: 'user1', senderName: 'You', text: 'Hey, how are you doing?', timestamp: new Date(Date.now() - 3600000) },
    { id: 2, senderId: 'other', senderName: activeChat?.name, text: 'Doing great! Just finished a project.', timestamp: new Date(Date.now() - 3000000) },
    { id: 3, senderId: 'user1', senderName: 'You', text: 'That sounds amazing! Tell me more.', timestamp: new Date(Date.now() - 1800000) },
    { id: 4, senderId: 'other', senderName: activeChat?.name, text: 'Would love to catch up soon!', timestamp: new Date(Date.now() - 600000) },
  ];

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      fetchMessages();
    }
  }, [activeChat]);

  const fetchMessages = async () => {
    if (!activeChat) return;
    setLoading(true);
    try {
      const data = await api.getMessages(activeChat.id);
      setMessages(data || mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages(mockMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeChat) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 'user1',
      senderName: 'You',
      text: inputText,
      timestamp: new Date(),
    };

    try {
      await api.sendMessage(activeChat.id, inputText);
      setMessages([...messages, newMessage]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: T.bg }}>
      {/* Left Sidebar - Conversation List */}
      <div
        style={{
          width: '300px',
          borderRight: `1px solid ${T.border}`,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: T.bg,
        }}
      >
        <div style={{ padding: '20px', borderBottom: `1px solid ${T.border}` }}>
          <h2 style={{ margin: 0, color: T.text, fontSize: '20px', fontWeight: '600' }}>Messages</h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          {members && members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveChat(member)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeChat?.id === member.id ? T.bgCard : 'transparent',
                  borderLeft: activeChat?.id === member.id ? `3px solid ${T.primary}` : 'none',
                  paddingLeft: activeChat?.id === member.id ? '13px' : '16px',
                  transition: 'background-color 0.2s',
                  ':hover': {
                    backgroundColor: T.bgCard,
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseOver={(e) => {
                  if (activeChat?.id !== member.id) {
                    e.currentTarget.style.backgroundColor = T.bgSoft;
                  }
                }}
                onMouseOut={(e) => {
                  if (activeChat?.id !== member.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Avatar src={member.avatar} name={member.name} size="40px" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: T.text, fontWeight: '500', fontSize: '14px' }}>
                    {member.name}
                  </div>
                  <div
                    style={{
                      color: T.textMuted,
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '4px',
                    }}
                  >
                    {member.lastMessage || 'No messages yet'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', color: T.textMuted, textAlign: 'center', fontSize: '14px' }}>
              No members to message
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: T.bg }}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: `1px solid ${T.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: T.bg,
              }}
            >
              <Avatar src={activeChat.avatar} name={activeChat.name} size="44px" />
              <div>
                <h3 style={{ margin: 0, color: T.text, fontSize: '16px', fontWeight: '600' }}>
                  {activeChat.name}
                </h3>
                <p style={{ margin: '4px 0 0 0', color: T.textMuted, fontSize: '12px' }}>
                  Online
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: T.bg,
              }}
            >
              {loading ? (
                <div style={{ color: T.textMuted, textAlign: 'center', marginTop: '20px' }}>
                  Loading messages...
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.senderId === 'user1' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '60%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor:
                          msg.senderId === 'user1' ? T.primary : T.bgCard,
                        color: msg.senderId === 'user1' ? '#000' : T.text,
                        fontSize: '14px',
                        wordWrap: 'break-word',
                      }}
                    >
                      <div>{msg.text}</div>
                      <div
                        style={{
                          fontSize: '11px',
                          marginTop: '4px',
                          opacity: 0.6,
                        }}
                      >
                        {msg.timestamp && msg.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: T.textMuted, textAlign: 'center', marginTop: '20px' }}>
                  No messages yet. Start the conversation!
                </div>
              )}
            </div>

            {/* Message Input */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: `1px solid ${T.border}`,
                display: 'flex',
                gap: '12px',
                backgroundColor: T.bg,
              }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${T.border}`,
                  backgroundColor: T.bgCard,
                  color: T.text,
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = T.primary;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  backgroundColor: inputText.trim() ? T.primary : T.bgCard,
                  color: inputText.trim() ? '#000' : T.textMuted,
                  border: 'none',
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
              >
                <Icon name="send" size="18px" />
              </Button>
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: T.textMuted,
              fontSize: '16px',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
