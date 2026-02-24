/**
 * Service Ollama pour les réponses AI
 * Communication avec Ollama localement (http://localhost:11434)
 * Modèle : gpt-oss:120b-cloud
 */

const OLLAMA_GENERATE_URL = "http://localhost:11434/api/generate";
const OLLAMA_CHAT_URL = "http://localhost:11434/api/chat";
const MODEL = "gpt-oss:120b-cloud";

export interface OllamaResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

export interface OllamaChatResponse {
    model: string;
    created_at: string;
    message: {
        role: "assistant";
        content: string;
    };
    done: boolean;
}

export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

/**
 * Appelle Ollama pour générer une réponse (endpoint /api/generate - sans historique)
 * @param prompt - Le texte à générer
 * @param context - Context optionnel pour la conversation
 * @returns La réponse générée
 */
export async function generateResponseFromOllama(
    prompt: string,
    context?: string
): Promise<string> {
    try {
        const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

        const response = await fetch(OLLAMA_GENERATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL,
                prompt: fullPrompt,
                stream: false,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }

        const data: OllamaResponse = await response.json();
        return data.response.trim();
    } catch (error) {
        console.error("Erreur Ollama:", error);
        throw new Error("Impossible de générer une réponse. Vérifiez qu'Ollama est en cours d'exécution.");
    }
}

/**
 * Vérifie si Ollama est disponible
 */
export async function isOllamaAvailable(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:11434/api/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Génère une réponse avec streaming (endpoint /api/generate)
 */
export async function generateResponseWithStream(
    prompt: string,
    onChunk: (chunk: string) => void,
    context?: string
): Promise<string> {
    try {
        const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
        let fullResponse = "";

        const response = await fetch(OLLAMA_GENERATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL,
                prompt: fullPrompt,
                stream: true,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Cannot read response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            // Process all complete lines
            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i]?.trim();
                if (line) {
                    try {
                        const data: OllamaResponse = JSON.parse(line);
                        fullResponse += data.response;
                        onChunk(data.response);
                    } catch (e) {
                        // Skip invalid JSON lines
                    }
                }
            }

            // Keep incomplete line in buffer
            buffer = lines[lines.length - 1] ?? "";
        }

        // Process remaining buffer
        if (buffer.trim()) {
            try {
                const data: OllamaResponse = JSON.parse(buffer);
                fullResponse += data.response;
                onChunk(data.response);
            } catch (e) {
                // Skip invalid JSON
            }
        }

        return fullResponse.trim();
    } catch (error) {
        console.error("Erreur Ollama Stream:", error);
        throw new Error("Impossible de générer une réponse en streaming.");
    }
}

// ============================================================
// Fonctions Chat (/api/chat) — avec historique de conversation
// ============================================================

/**
 * Envoie l'historique complet de la conversation à Ollama via /api/chat
 * Le modèle reçoit tout le contexte et peut répondre de manière cohérente.
 *
 * @param messages - Historique complet des messages { role, content }
 * @returns La réponse de l'assistant
 */
export async function chatWithOllama(
    messages: ChatMessage[]
): Promise<string> {
    try {
        const response = await fetch(OLLAMA_CHAT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                stream: false,
                options: {
                    temperature: 0.7,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama Chat API error: ${response.statusText}`);
        }

        const data: OllamaChatResponse = await response.json();
        return data.message.content.trim();
    } catch (error) {
        console.error("Erreur Ollama Chat:", error);
        throw new Error(
            "Impossible de générer une réponse. Vérifiez qu'Ollama est en cours d'exécution avec le modèle gpt-oss:120b-cloud."
        );
    }
}

/**
 * Envoie l'historique complet avec streaming (token par token).
 * Appelle onChunk à chaque fragment reçu pour un affichage en temps réel.
 *
 * @param messages - Historique complet des messages { role, content }
 * @param onChunk - Callback appelé à chaque fragment de texte reçu
 * @returns La réponse complète de l'assistant
 */
export async function chatWithOllamaStream(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void
): Promise<string> {
    try {
        let fullResponse = "";

        const response = await fetch(OLLAMA_CHAT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                stream: true,
                options: {
                    temperature: 0.7,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama Chat API error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Cannot read response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i]?.trim();
                if (line) {
                    try {
                        const data: OllamaChatResponse = JSON.parse(line);
                        if (data.message?.content) {
                            fullResponse += data.message.content;
                            onChunk(data.message.content);
                        }
                    } catch (e) {
                        // Skip invalid JSON lines
                    }
                }
            }

            buffer = lines[lines.length - 1] ?? "";
        }

        // Process remaining buffer
        if (buffer.trim()) {
            try {
                const data: OllamaChatResponse = JSON.parse(buffer);
                if (data.message?.content) {
                    fullResponse += data.message.content;
                    onChunk(data.message.content);
                }
            } catch (e) {
                // Skip invalid JSON
            }
        }

        return fullResponse.trim();
    } catch (error) {
        console.error("Erreur Ollama Chat Stream:", error);
        throw new Error(
            "Impossible de générer une réponse en streaming. Vérifiez qu'Ollama est en cours d'exécution."
        );
    }
}
