import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom"
import styled from "styled-components";
import { Send, MessageCircle, Loader2, Copy, Trash2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateResponseFromOllama, isOllamaAvailable } from "../config/ollamaService";

type RouteParams = {
    ID_Project: number;
};

type Message = {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
};

type Conversation = {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
};

// Styled Components
const Container = styled.section`
    width: 100%;
    height: calc(100vh - 100px);
    background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
    display: flex;
    flex-direction: column;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 15px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #00d4ff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9em;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 212, 255, 0.1);
        color: #fff;
    }
`;

const Title = styled.h1`
    color: white;
    font-size: 1.5em;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        color: #00d4ff;
    }
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    gap: 15px;
    padding: 15px;
    overflow: hidden;
`;

const Sidebar = styled.aside`
    width: 280px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 15px;
    overflow-y: auto;

    @media (max-width: 768px) {
        display: none;
    }
`;

const ConversationItem = styled.button<{ active?: boolean }>`
    padding: 12px 15px;
    background: ${(p) => p.active ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.05)"};
    border: 1px solid ${(p) => p.active ? "rgba(0, 212, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 8px;
    color: white;
    cursor: pointer;
    text-align: left;
    font-size: 0.9em;
    transition: all 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background: rgba(0, 212, 255, 0.15);
        border-color: rgba(0, 212, 255, 0.4);
    }
`;

const ChatArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 212, 255, 0.4);
        border-radius: 4px;

        &:hover {
            background: rgba(0, 212, 255, 0.6);
        }
    }
`;

const MessageWrapper = styled.div<{ role: "user" | "assistant" | "system" }>`
    display: flex;
    justify-content: ${(p) => (p.role === "user" ? "flex-end" : "flex-start")};
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const MessageBubble = styled.div<{ role: "user" | "assistant" | "system" }>`
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
    background: ${(p) =>
    {
        switch (p.role)
        {
            case "user":
                return "linear-gradient(135deg, #00d4ff, #0099ff)";
            case "assistant":
                return "rgba(255, 255, 255, 0.1)";
            case "system":
                return "rgba(255, 193, 7, 0.1)";
            default:
                return "rgba(255, 255, 255, 0.05)";
        }
    }};
    color: ${(p) => (p.role === "user" ? "white" : "rgba(255, 255, 255, 0.9)")};
    border: ${(p) =>
    {
        if (p.role === "user") return "none";
        if (p.role === "system") return "1px solid rgba(255, 193, 7, 0.3)";
        return "1px solid rgba(255, 255, 255, 0.1)";
    }};
    border-radius: 12px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 0.95em;
    line-height: 1.5;

    @media (max-width: 768px) {
        max-width: 85%;
    }
`;

const MessageTime = styled.span`
    font-size: 0.75em;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 4px;
    display: block;
`;

const InputArea = styled.form`
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.02);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    gap: 10px;
`;

const Input = styled.textarea`
    flex: 1;
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95em;
    resize: none;
    max-height: 100px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(0, 212, 255, 0.5);
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
`;

const SendButton = styled.button`
    padding: 12px 20px;
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    gap: 15px;

    svg {
        width: 60px;
        height: 60px;
        color: rgba(255, 255, 255, 0.3);
    }

    p {
        max-width: 300px;
        line-height: 1.6;
    }
`;

// Sample data for demo
const SAMPLE_CONVERSATIONS: Conversation[] = [
    {
        id: "1",
        title: "Questions scénario",
        messages: [
            {
                id: "m1",
                role: "user",
                content: "Comment analyser ce scénario?",
                timestamp: new Date(Date.now() - 3600000),
            },
            {
                id: "m2",
                role: "assistant",
                content:
                    "Pour analyser votre scénario, vous pouvez utiliser l'outil de dépouillement IA qui extrait automatiquement les personnages, scènes, localités et durées estimées.",
                timestamp: new Date(Date.now() - 3500000),
            },
        ],
        createdAt: new Date(Date.now() - 86400000),
    },
    {
        id: "2",
        title: "Planification production",
        messages: [
            {
                id: "m3",
                role: "user",
                content: "Quelle est la meilleure approach pour la production?",
                timestamp: new Date(Date.now() - 7200000),
            },
            {
                id: "m4",
                role: "assistant",
                content:
                    "Organisez votre production en phases: Préproduction, Tournage, Postproduction. Définissez un calendrier clair et évaluez les ressources nécessaires.",
                timestamp: new Date(Date.now() - 7100000),
            },
        ],
        createdAt: new Date(Date.now() - 172800000),
    },
];

function Chat()
{
    const navigate = useNavigate();
    const { ID_Project } = useOutletContext<RouteParams>();
    const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
    const [activeConvId, setActiveConvId] = useState<string>("1");
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find((c) => c.id === activeConvId);

    const scrollToBottom = () =>
    {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() =>
    {
        scrollToBottom();
    }, [activeConversation?.messages]);

    const handleSendMessage = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        if (!input.trim() || !activeConversation) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === activeConvId
                    ? { ...conv, messages: [...conv.messages, userMessage] }
                    : conv
            )
        );

        setInput("");
        setLoading(true);

        // Simulate AI response or call Ollama
        setTimeout(() =>
        {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Réponse générée pour: "${input.substring(0, 30)}..."`,
                timestamp: new Date(),
            };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === activeConvId
                        ? { ...conv, messages: [...conv.messages, assistantMessage] }
                        : conv
                )
            );
            setLoading(false);
        }, 800);
    };

    const handleNewConversation = () =>
    {
        const newConv: Conversation = {
            id: Date.now().toString(),
            title: "Nouvelle conversation",
            messages: [
                {
                    id: "sys1",
                    role: "system",
                    content: `Conversation créée pour le projet #${ID_Project}`,
                    timestamp: new Date(),
                },
            ],
            createdAt: new Date(),
        };

        setConversations((prev) => [...prev, newConv]);
        setActiveConvId(newConv.id);
    };

    const handleDeleteConversation = (id: string) =>
    {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConvId === id && conversations.length > 1)
        {
            setActiveConvId(conversations[0].id);
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate("../overview")}>
                    <ChevronLeft size={18} />
                    Retour
                </BackButton>
                <Title>
                    <MessageCircle size={28} />
                    Chat Assistant
                </Title>
            </Header>

            <Content>
                <Sidebar>
                    <ConversationItem onClick={handleNewConversation} style={{ marginBottom: "10px", fontWeight: 600 }}>
                        + Nouvelle conversation
                    </ConversationItem>
                    {conversations.map((conv) => (
                        <div key={conv.id} style={{ display: "flex", gap: "5px" }}>
                            <ConversationItem
                                active={activeConvId === conv.id}
                                onClick={() => setActiveConvId(conv.id)}
                                style={{ flex: 1 }}
                            >
                                {conv.title}
                            </ConversationItem>
                            {activeConvId === conv.id && (
                                <button
                                    onClick={() => handleDeleteConversation(conv.id)}
                                    style={{
                                        background: "rgba(255, 59, 48, 0.1)",
                                        border: "1px solid rgba(255, 59, 48, 0.3)",
                                        color: "#ff3b30",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        padding: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </Sidebar>

                <ChatArea>
                    {activeConversation && activeConversation.messages.length > 0 ? (
                        <>
                            <MessagesContainer>
                                {activeConversation.messages.map((msg) => (
                                    <MessageWrapper key={msg.id} role={msg.role}>
                                        <div style={{ maxWidth: "70%" }}>
                                            <MessageBubble role={msg.role}>
                                                {msg.content}
                                            </MessageBubble>
                                            <MessageTime>{msg.timestamp.toLocaleTimeString("fr-FR")}</MessageTime>
                                        </div>
                                    </MessageWrapper>
                                ))}
                                {loading && (
                                    <MessageWrapper role="assistant">
                                        <MessageBubble role="assistant" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                            Génération de réponse...
                                        </MessageBubble>
                                    </MessageWrapper>
                                )}
                                <div ref={messagesEndRef} />
                            </MessagesContainer>

                            <InputArea onSubmit={handleSendMessage}>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) =>
                                    {
                                        if (e.key === "Enter" && !e.shiftKey)
                                        {
                                            e.preventDefault();
                                            handleSendMessage(e as any);
                                        }
                                    }}
                                    placeholder="Écrivez votre message... (Shift+Entrée pour nouvelle ligne)"
                                    disabled={loading}
                                />
                                <SendButton type="submit" disabled={loading || !input.trim()}>
                                    {loading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={20} />}
                                </SendButton>
                            </InputArea>
                        </>
                    ) : (
                        <EmptyState>
                            <MessageCircle />
                            <div>
                                <p>Aucun message pour le moment</p>
                                <p style={{ fontSize: "0.85em", opacity: 0.6 }}>Commencez une conversation en sélectionnant un sujet</p>
                            </div>
                        </EmptyState>
                    )}
                </ChatArea>
            </Content>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Container>
    );
}

export default Chat;
