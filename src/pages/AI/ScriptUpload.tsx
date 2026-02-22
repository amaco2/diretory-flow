import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom"
import styled from "styled-components";
import axio from "../../config/axiosConfig";
import { File, Upload, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { TContext } from "../../ThemeContext";
import SaveScriptUpload from "./SaveScriptUpload";
// import { itemslist } from "../ProjectUsers/ComponentUser.jsx"

type RouteParams = {
    ID_Project: number;
};

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
    padding: 40px 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Header = styled.div`
    padding: 35px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
    color: white;
    font-size: 2.5em;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    animation: slideInLeft 0.6s ease-out;

    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

const Subtitle = styled.p`
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1em;
    margin: 0;
`;

const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

const CarouselSection = styled.aside`
    padding: 25px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
`;

const Carousel = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
`;

const CarouselSlide = styled.div<{ active: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: ${p => p.active ? 1 : 0};
    transition: opacity 0.5s ease-in-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CarouselDots = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
`;

const Dot = styled.button<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: ${p => p.active ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)'};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #00d4ff;
        transform: scale(1.2);
    }
`;

const Caption = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9em;
    text-align: center;
    margin-top: 10px;
`;

const FormSection = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const DropZone = styled.label`
    position: relative;
    padding: 40px;
    background: rgba(0, 212, 255, 0.05);
    border: 2px dashed rgba(0, 212, 255, 0.4);
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    input[type="file"] {
        display: none;
    }

    &:hover {
        background: rgba(0, 212, 255, 0.1);
        border-color: rgba(0, 212, 255, 0.7);
        transform: translateY(-2px);
    }
`;

const DropContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1em;

    svg {
        width: 40px;
        height: 40px;
        color: #00d4ff;
    }

    p {
        margin: 0;
        font-weight: 500;
    }
`;

const ErrorMessage = styled.span`
    color: #ff3b30;
    font-size: 0.9em;
    padding: 10px;
    background: rgba(255, 59, 48, 0.1);
    border-left: 3px solid #ff3b30;
    border-radius: 4px;
    display: block;
`;

const SubmitButton = styled.button`
    padding: 14px 28px;
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
    }
`;

const StepsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const StepCard = styled.div<{ index: number }>`
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 3px solid #00d4ff;
    border-radius: 8px;
    transition: all 0.3s ease;
    animation: slideUp 0.6s ease-out;
    animation-delay: ${p => p.index * 0.1}s;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(0, 212, 255, 0.6);
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 212, 255, 0.15);
    }
`;

const StepNumber = styled.div`
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
`;

const StepTitle = styled.h3`
    color: white;
    font-size: 1.1em;
    margin: 0 0 8px 0;
    font-weight: 600;
`;

const StepDesc = styled.p`
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9em;
    margin: 0;
    line-height: 1.5;
`;


function ScriptUpload()
{
    const { ID_Project } = useOutletContext<RouteParams>();

    const { projectId } = useContext<Record<string, number> | Record<string, string>>(TContext)
    const [file, setFile] = useState<File | null>();
    const [checkHandlesending, setCheckHandleSending] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dataScript, setDataScript] = useState<any>(null);
    // Dynamically import all images from the asset folder (Vite)
    // @ts-ignore
    const modules = import.meta.glob('../../IA_asset/*.{jpg,jpeg,png}', { eager: true }) as Record<string, any>;
    const entries = Object.entries(modules).sort((a, b) => a[0].localeCompare(b[0])).slice(0, 4);
    const images = entries.map(([k, v]) => v.default || v);
    const captions = entries.map(([k]) =>
    {
        const name = k.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Image';
        const pretty = name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return `${pretty} — Production cinématographique`;
    });
    const [current, setCurrent] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(false);
    const steps = [
        { title: 'Choisir le fichier', desc: "Sélectionnez ou glissez‑déposez votre scénario (.pdf, .docx, .txt)." },
        { title: 'Vérifier le format', desc: "Assurez‑vous que le fichier est lisible et respecte le format demandé." },
        { title: 'Envoyer pour dépouillement', desc: "Cliquez sur « Envoyer le scénario » pour lancer l'analyse automatisée." },
        { title: 'Analyse en cours', desc: "Le système dépouille le scénario et extrait les éléments de production (personnages, scènes, durée...)." },
        { title: 'Consulter les résultats', desc: "Une fois terminé, consultez le rapport et suggestions dans la section de projet." },
    ];

    useEffect(() =>
    {
        if (paused || images.length === 0) return;
        const id = setInterval(() =>
        {
            setCurrent((c) => (c + 1) % images.length);
        }, 3000);
        return () => clearInterval(id);
    }, [paused, images.length]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        if (!e.target.files || e.target.files.length === 0) return;
        setFile(e.target.files[0]);
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        // setCheckHandleSending(() => true);

        if (!file)
        {
            setError("Veulliez selectionner un fichier");
            return;
        }

        if (!ID_Project)
        {
            setError("Projet introuvable");
            return;
        }

        setError(null);
        setLoading(true);

        console.log("id du projet", projectId)

        try
        {
            const formaData = new FormData();
            formaData.append("script", file);

            setLoading(true);
            console.log(ID_Project);
            const response: any = await axio.post(`/api/depouillement/projects/${ID_Project}/analyse`,
                formaData,
                { withCredentials: true },
            );

            // setCheckHandleSending(() => true);

            // Récupération propre de la donnée AI (gestion des variantes de clé)
            const raw = response.data?.aiOutput ?? response.data?.aiOutpout ?? null;


            // Préparer une chaîne JSON fiable pour le localStorage
            let jsonString: string | null = null;
            if (raw === null || raw === undefined)
            {
                jsonString = JSON.stringify({});
            } else if (typeof raw === 'string')
            {
                // raw peut déjà être une chaîne JSON ou du texte brut
                try
                {
                    // si c'est une chaîne JSON valide, on la normalise
                    const parsed = JSON.parse(raw);
                    jsonString = JSON.stringify(parsed);
                } catch (e)
                {
                    // texte brut -> on enveloppe dans un objet
                    jsonString = JSON.stringify({ text: raw });
                }
            } else
            {
                // objet -> stringify
                jsonString = JSON.stringify(raw);
            }

            // Stocker uniquement du JSON dans localStorage
            localStorage.setItem("aiOutput", jsonString);

            // Stocker l'objet parsé dans le state (setDataScript)
            try
            {
                const parsed = JSON.parse(jsonString as string);
                setDataScript(parsed);
            } catch (e)
            {
                // fallback: stocker objet vide
                setDataScript({});
            }
            alert('Scénario envoyé avec succè');
            setCheckHandleSending(() => true);

        } catch (err: any)
        {
            setError(
                err.response?.data?.message || err.message || "Erreur inconue"
            );
        } finally
        {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <Title>
                    <Upload size={40} />
                    Dépouillement de Scénario IA
                </Title>
                <Subtitle>Analysez vos scénarios automatiquement et générez des dépouillements professionnels</Subtitle>
            </Header>

            <MainContent>
                {/* Carrousel Aside */}
                <CarouselSection onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    <Carousel>
                        {images.map((src, idx) => (
                            <CarouselSlide key={idx} active={idx === current}>
                                <img src={src} alt={`Production cinématographique ${idx + 1}`} />
                            </CarouselSlide>
                        ))}
                    </Carousel>
                    <CarouselDots>
                        {images.map((_, idx) => (
                            <Dot key={idx} active={idx === current} onClick={() => setCurrent(idx)} />
                        ))}
                    </CarouselDots>
                    <Caption>{captions[current]}</Caption>
                </CarouselSection>

                {/* Formulaire */}
                <FormSection onSubmit={handleSubmit}>
                    <DropZone>
                        <input
                            type="file"
                            accept=".pdf, .doc, .docx, .txt"
                            id="input-file"
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                        <DropContent>
                            <File />
                            <p>Glissez votre scénario ici ou cliquez pour sélectionner</p>
                            <span style={{ fontSize: '0.8em', opacity: 0.6 }}>(.pdf, .docx, .txt)</span>
                        </DropContent>
                    </DropZone>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton type="submit" disabled={loading || !file}>
                        {loading ? (
                            <>
                                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                Analyse en cours...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={20} />
                                Envoyer pour dépouillement
                            </>
                        )}
                    </SubmitButton>

                    {file && (
                        <div style={{ color: 'rgba(0, 212, 255, 0.8)', fontSize: '0.9em' }}>
                            ✓ Fichier sélectionné: <strong>{file.name}</strong>
                        </div>
                    )}
                </FormSection>
            </MainContent>

            {/* Étapes */}
            <div>
                <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.5em' }}>Processus de dépouillement</h2>
                <StepsContainer>
                    {steps.map((step, index) => (
                        <StepCard key={index} index={index}>
                            <StepNumber>{index + 1}</StepNumber>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDesc>{step.desc}</StepDesc>
                        </StepCard>
                    ))}
                </StepsContainer>
            </div>

            {/* Dialog SaveScriptUpload */}
            {!error && (
                < SaveScriptUpload
                    aiOuput={dataScript}
                    URL_version="depouillement-extraction"
                    setCheckHandleSending={setCheckHandleSending}
                    projectId={ID_Project}
                    checkHandlesending={checkHandlesending}
                />
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Container>
    )
}

export default ScriptUpload;