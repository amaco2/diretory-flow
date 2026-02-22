/**
 * Service Ollama Mistral pour les réponses AI
 * Communicationavec Ollama localement (http://localhost:11434)
 */

const OLLAMA_API_URL = "http://localhost:11434/api/generate";
const MODEL = "mistral";

export interface OllamaResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

/**
 * Appelle Ollama Mistral pour générer une réponse
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

        const response = await fetch(OLLAMA_API_URL, {
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
 * Génère une réponse avec streaming (pour affichage en temps réel)
 */
export async function generateResponseWithStream(
    prompt: string,
    onChunk: (chunk: string) => void,
    context?: string
): Promise<string> {
    try {
        const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
        let fullResponse = "";

        const response = await fetch(OLLAMA_API_URL, {
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
                const line = lines[i].trim();
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
            buffer = lines[lines.length - 1];
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
