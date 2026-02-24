import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Send, MessageCircle, Loader2, Copy, Trash2, ChevronLeft, CheckCircle, XCircle, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { chatWithOllamaStream, isOllamaAvailable } from "../config/ollamaService";
import type { ChatMessage } from "../config/ollamaService";

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

// Animations
const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

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
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
    font-size: 1.4em;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        color: #00d4ff;
    }
`;

const StatusBadge = styled.div<{ online: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: ${(p) => p.online ? "rgba(52, 199, 89, 0.12)" : "rgba(255, 59, 48, 0.12)"};
    border: 1px solid ${(p) => p.online ? "rgba(52, 199, 89, 0.3)" : "rgba(255, 59, 48, 0.3)"};
    border-radius: 20px;
    font-size: 0.8em;
    color: ${(p) => p.online ? "#34c759" : "#ff3b30"};
    font-weight: 500;
    white-space: nowrap;

    svg {
        color: inherit;
    }
`;

const ModelBadge = styled.div`
    padding: 6px 14px;
    background: rgba(0, 212, 255, 0.08);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 20px;
    font-size: 0.75em;
    color: rgba(0, 212, 255, 0.8);
    font-weight: 500;
    white-space: nowrap;
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    gap: 0;
    overflow: hidden;
`;

const Sidebar = styled.aside`
    width: 280px;
    background: rgba(255, 255, 255, 0.02);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 15px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const NewConversationButton = styled.button`
    padding: 12px 15px;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 153, 255, 0.15));
    border: 1px dashed rgba(0, 212, 255, 0.4);
    border-radius: 10px;
    color: #00d4ff;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    &:hover {
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(0, 153, 255, 0.25));
        border-color: rgba(0, 212, 255, 0.6);
        transform: translateY(-1px);
    }
`;

const ConversationItem = styled.button<{ active?: boolean }>`
    padding: 12px 15px;
    background: ${(p) => p.active ? "rgba(0, 212, 255, 0.15)" : "rgba(255, 255, 255, 0.03)"};
    border: 1px solid ${(p) => p.active ? "rgba(0, 212, 255, 0.3)" : "rgba(255, 255, 255, 0.06)"};
    border-radius: 10px;
    color: ${(p) => p.active ? "#fff" : "rgba(255,255,255,0.7)"};
    cursor: pointer;
    text-align: left;
    font-size: 0.88em;
    transition: all 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background: rgba(0, 212, 255, 0.1);
        border-color: rgba(0, 212, 255, 0.2);
        color: #fff;
    }
`;

const ChatArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 3px;

        &:hover {
            background: rgba(255, 255, 255, 0.15);
        }
    }
`;

const MessageWrapper = styled.div<{ role: "user" | "assistant" | "system" }>`
    display: flex;
    justify-content: ${(p) => (p.role === "user" ? "flex-end" : "flex-start")};
    animation: ${slideIn} 0.3s ease-out;
`;

const MessageBubble = styled.div<{ role: "user" | "assistant" | "system" }>`
    max-width: 75%;
    padding: 14px 18px;
    border-radius: ${(p) => {
        if (p.role === "user") return "18px 18px 4px 18px";
        return "18px 18px 18px 4px";
    }};
    background: ${(p) => {
        switch (p.role) {
            case "user":
                return "linear-gradient(135deg, #00d4ff, #0088cc)";
            case "assistant":
                return "rgba(255, 255, 255, 0.06)";
            case "system":
                return "rgba(255, 193, 7, 0.08)";
            default:
                return "rgba(255, 255, 255, 0.04)";
        }
    }};
    color: ${(p) => (p.role === "user" ? "white" : "rgba(255, 255, 255, 0.9)")};
    border: ${(p) => {
        if (p.role === "user") return "none";
        if (p.role === "system") return "1px solid rgba(255, 193, 7, 0.2)";
        return "1px solid rgba(255, 255, 255, 0.08)";
    }};
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 0.93em;
    line-height: 1.6;
    position: relative;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const MessageMeta = styled.div<{ role: "user" | "assistant" | "system" }>`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
    justify-content: ${(p) => (p.role === "user" ? "flex-end" : "flex-start")};
`;

const MessageTime = styled.span`
    font-size: 0.72em;
    color: rgba(255, 255, 255, 0.35);
`;

const CopyButton = styled.button`
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        color: #00d4ff;
        background: rgba(0, 212, 255, 0.1);
    }
`;

const StreamingCursor = styled.span`
    display: inline-block;
    width: 2px;
    height: 1em;
    background: #00d4ff;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: ${blink} 0.8s infinite;
`;

const TypingIndicator = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px 18px 18px 4px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9em;
    animation: ${pulse} 1.5s infinite;

    svg {
        animation: ${spin} 1s linear infinite;
    }
`;

const InputArea = styled.form`
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    gap: 10px;
    align-items: flex-end;
`;

const Input = styled.textarea`
    flex: 1;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.93em;
    resize: none;
    max-height: 120px;
    min-height: 48px;
    transition: all 0.3s ease;
    line-height: 1.5;

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.07);
        border-color: rgba(0, 212, 255, 0.4);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.3);
    }
`;

const SendButton = styled.button`
    padding: 14px 20px;
    background: linear-gradient(135deg, #00d4ff, #0088cc);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.25);
    min-width: 52px;
    min-height: 48px;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 212, 255, 0.35);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    gap: 20px;

    svg {
        width: 64px;
        height: 64px;
        color: rgba(0, 212, 255, 0.2);
    }

    h2 {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.3em;
        margin: 0;
    }

    p {
        max-width: 360px;
        line-height: 1.6;
        font-size: 0.9em;
    }
`;

const ErrorMessage = styled.div`
    padding: 12px 16px;
    background: rgba(255, 59, 48, 0.08);
    border: 1px solid rgba(255, 59, 48, 0.2);
    border-radius: 10px;
    color: #ff6b6b;
    font-size: 0.88em;
    margin: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SuggestionChips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 10px;
`;

const SuggestionChip = styled.button`
    padding: 10px 18px;
    background: rgba(0, 212, 255, 0.06);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 20px;
    color: rgba(0, 212, 255, 0.8);
    cursor: pointer;
    font-size: 0.85em;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 212, 255, 0.15);
        border-color: rgba(0, 212, 255, 0.4);
        color: #00d4ff;
        transform: translateY(-1px);
    }
`;

function Chat() {
    const navigate = useNavigate();
    const { ID_Project } = useOutletContext<RouteParams>();

    // Session state — tout est en mémoire, rien en base de données
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        const initial: Conversation = {
            id: "initial",
            title: "Nouvelle conversation",
            messages: [],
            createdAt: new Date(),
        };
        return [initial];
    });
    const [activeConvId, setActiveConvId] = useState<string>("initial");
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [streamingContent, setStreamingContent] = useState<string>("");
    const [ollamaOnline, setOllamaOnline] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const activeConversation = conversations.find((c) => c.id === activeConvId);

    // Vérifier si Ollama est disponible
    useEffect(() => {
        const checkOllama = async () => {
            const available = await isOllamaAvailable();
            setOllamaOnline(available);
        };
        checkOllama();
        const interval = setInterval(checkOllama, 10000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll vers le bas
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation?.messages, streamingContent, scrollToBottom]);

    /**
     * Construit l'historique au format Ollama Chat API
     * On envoie TOUS les messages de la conversation pour garder le contexte
     */
    const buildChatHistory = (conv: Conversation, newUserMessage: string): ChatMessage[] => {
        const history: ChatMessage[] = [];

        // Message système pour donner le contexte du projet
        history.push({
            role: "system",
            content: `Tu es un assistant IA pour un projet de production audiovisuelle (projet #${ID_Project}). Réponds de manière utile et précise en français. Tu as accès au contexte complet de la conversation et tu dois te souvenir de tout ce qui a été dit. Et surtout ne soit pas trop verbeux reste dans le contexte de gestion de projet audiovisuel et repond uniquement dans ce cadre.`,
        });

        // Ajouter tous les messages existants (user + assistant seulement)
        for (const msg of conv.messages) {
            if (msg.role === "user" || msg.role === "assistant") {
                history.push({
                    role: msg.role,
                    content: msg.content,
                });
            }
        }

        // Ajouter le nouveau message utilisateur
        history.push({
            role: "user",
            content: newUserMessage,
        });

        return history;
    };

    /**
     * Envoyer un message et obtenir la réponse de l'IA en streaming
     */
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim() || !activeConversation || loading) return;

        const userText = input.trim();
        setError(null);

        // Ajouter le message utilisateur
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: userText,
            timestamp: new Date(),
        };

        // Mettre à jour le titre si c'est le premier message utilisateur
        const isFirstUserMessage = activeConversation.messages.filter(m => m.role === "user").length === 0;

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === activeConvId
                    ? {
                        ...conv,
                        title: isFirstUserMessage ? userText.substring(0, 40) + (userText.length > 40 ? "..." : "") : conv.title,
                        messages: [...conv.messages, userMessage],
                    }
                    : conv
            )
        );

        setInput("");
        setLoading(true);
        setStreamingContent("");

        try {
            // Construire l'historique complet de conversation pour le contexte
            const chatHistory = buildChatHistory(activeConversation, userText);

            // Appeler Ollama avec streaming
            const fullResponse = await chatWithOllamaStream(
                chatHistory,
                (chunk: string) => {
                    setStreamingContent((prev) => prev + chunk);
                }
            );

            // Streaming terminé : ajouter la réponse complète en tant que message
            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: fullResponse,
                timestamp: new Date(),
            };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === activeConvId
                        ? { ...conv, messages: [...conv.messages, assistantMessage] }
                        : conv
                )
            );
        } catch (err: any) {
            console.error("Erreur chat:", err);
            setError(
                err.message || "Impossible de contacter Ollama. Vérifiez que le serveur est démarré."
            );
        } finally {
            setLoading(false);
            setStreamingContent("");
        }
    };

    const handleNewConversation = () => {
        const newConv: Conversation = {
            id: Date.now().toString(),
            title: "Nouvelle conversation",
            messages: [],
            createdAt: new Date(),
        };

        setConversations((prev) => [...prev, newConv]);
        setActiveConvId(newConv.id);
        setError(null);
    };

    const handleDeleteConversation = (id: string) => {
        if (conversations.length <= 1) {
            // Si c'est la dernière, on la vide au lieu de la supprimer
            setConversations((prev) =>
                prev.map((c) =>
                    c.id === id ? { ...c, messages: [], title: "Nouvelle conversation" } : c
                )
            );
            return;
        }
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConvId === id) {
            const remaining = conversations.find((c) => c.id !== id);
            setActiveConvId(remaining ? remaining.id : (conversations[0]?.id ?? ""));
        }
    };

    const handleCopyMessage = async (msg: Message) => {
        try {
            await navigator.clipboard.writeText(msg.content);
            setCopiedMsgId(msg.id);
            setTimeout(() => setCopiedMsgId(null), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = msg.content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopiedMsgId(msg.id);
            setTimeout(() => setCopiedMsgId(null), 2000);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    const suggestions = [
        "Analyser un scénario",
        "Planifier le tournage",
        "Estimer le budget",
        "Identifier les rôles clés",
    ];

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate("../overview")}>
                    <ChevronLeft size={18} />
                    Retour
                </BackButton>
                <Title>
                    <MessageCircle size={26} />
                    Chat IA
                </Title>
                <ModelBadge>gpt-oss:120b-cloud</ModelBadge>
                <StatusBadge online={ollamaOnline}>
                    {ollamaOnline ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {ollamaOnline ? "Connecté" : "Hors ligne"}
                </StatusBadge>
            </Header>

            <Content>
                <Sidebar>
                    <NewConversationButton onClick={handleNewConversation}>
                        <Plus size={18} />
                        Nouvelle conversation
                    </NewConversationButton>
                    {conversations.map((conv) => (
                        <div key={conv.id} style={{ display: "flex", gap: "5px" }}>
                            <ConversationItem
                                active={activeConvId === conv.id}
                                onClick={() => {
                                    setActiveConvId(conv.id);
                                    setError(null);
                                }}
                                style={{ flex: 1 }}
                            >
                                {conv.title}
                            </ConversationItem>
                            {activeConvId === conv.id && (
                                <button
                                    onClick={() => handleDeleteConversation(conv.id)}
                                    style={{
                                        background: "rgba(255, 59, 48, 0.08)",
                                        border: "1px solid rgba(255, 59, 48, 0.2)",
                                        color: "#ff3b30",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        padding: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    ))}
                </Sidebar>

                <ChatArea>
                    {activeConversation && (activeConversation.messages.length > 0 || loading) ? (
                        <>
                            <MessagesContainer>
                                {activeConversation.messages.map((msg) => (
                                    <MessageWrapper key={msg.id} role={msg.role}>
                                        <div style={{ maxWidth: "75%" }}>
                                            <MessageBubble role={msg.role}>
                                                {msg.content}
                                            </MessageBubble>
                                            <MessageMeta role={msg.role}>
                                                <MessageTime>
                                                    {msg.timestamp.toLocaleTimeString("fr-FR", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </MessageTime>
                                                {msg.role !== "system" && (
                                                    <CopyButton
                                                        onClick={() => handleCopyMessage(msg)}
                                                        title="Copier le message"
                                                    >
                                                        {copiedMsgId === msg.id ? (
                                                            <Check size={13} />
                                                        ) : (
                                                            <Copy size={13} />
                                                        )}
                                                    </CopyButton>
                                                )}
                                            </MessageMeta>
                                        </div>
                                    </MessageWrapper>
                                ))}

                                {/* Message en cours de streaming */}
                                {loading && streamingContent && (
                                    <MessageWrapper role="assistant">
                                        <div style={{ maxWidth: "75%" }}>
                                            <MessageBubble role="assistant">
                                                {streamingContent}
                                                <StreamingCursor />
                                            </MessageBubble>
                                        </div>
                                    </MessageWrapper>
                                )}

                                {/* Indicateur de chargement (avant que le streaming commence) */}
                                {loading && !streamingContent && (
                                    <MessageWrapper role="assistant">
                                        <TypingIndicator>
                                            <Loader2 size={16} />
                                            Réflexion en cours...
                                        </TypingIndicator>
                                    </MessageWrapper>
                                )}

                                <div ref={messagesEndRef} />
                            </MessagesContainer>

                            {error && (
                                <ErrorMessage>
                                    <XCircle size={16} />
                                    {error}
                                </ErrorMessage>
                            )}

                            <InputArea onSubmit={handleSendMessage}>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e as any);
                                        }
                                    }}
                                    placeholder={
                                        ollamaOnline
                                            ? "Écrivez votre message... (Shift+Entrée pour nouvelle ligne)"
                                            : "⚠️ Ollama hors ligne — démarrez-le pour chatter"
                                    }
                                    disabled={loading}
                                    rows={1}
                                />
                                <SendButton type="submit" disabled={loading || !input.trim() || !ollamaOnline}>
                                    {loading ? (
                                        <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                </SendButton>
                            </InputArea>
                        </>
                    ) : (
                        <>
                            <EmptyState>
                                <MessageCircle />
                                <h2>Démarrer une conversation</h2>
                                <p>
                                    Posez vos questions sur votre projet. L'IA garde le contexte de toute la conversation pour des réponses cohérentes.
                                </p>
                                <SuggestionChips>
                                    {suggestions.map((s) => (
                                        <SuggestionChip key={s} onClick={() => handleSuggestionClick(s)}>
                                            {s}
                                        </SuggestionChip>
                                    ))}
                                </SuggestionChips>
                                {!ollamaOnline && (
                                    <ErrorMessage style={{ margin: "10px 0" }}>
                                        <XCircle size={16} />
                                        Ollama n'est pas connecté. Lancez-le avec : ollama run gpt-oss:120b-cloud
                                    </ErrorMessage>
                                )}
                            </EmptyState>
                            <InputArea onSubmit={handleSendMessage}>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e as any);
                                        }
                                    }}
                                    placeholder={
                                        ollamaOnline
                                            ? "Écrivez votre message pour commencer..."
                                            : "⚠️ Ollama hors ligne — démarrez-le pour chatter"
                                    }
                                    disabled={loading}
                                    rows={1}
                                />
                                <SendButton type="submit" disabled={loading || !input.trim() || !ollamaOnline}>
                                    <Send size={20} />
                                </SendButton>
                            </InputArea>
                        </>
                    )}
                </ChatArea>
            </Content>
        </Container>
    );
}

export default Chat;
