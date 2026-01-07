import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom"
import axio from "../../config/axiosConfig";
import './style/style.css'
import { File, FileArchive } from "lucide-react";
import { itemslist } from "../../Component/ProjectUsers/ComponentUser";
import { TContext } from "../../ThemeContext";
import { Footer } from "../../Ui/Main";
import SaveScriptUpload from "./SaveScriptUpload";


type RouteParams = {
    ID_Project: number;
};


function ScriptUpload()
{
    const { ID_Project } = useOutletContext<RouteParams>();

    const { projectId } = useContext<Record<string, number> | Record<string, string>>(TContext)
    const [file, setFile] = useState<File | null>();
    const [checkHandlesending, setCheckHandleSending] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dataScript, setDataScript] = useState<Object | any>({ longText: '' });
    // Dynamically import all images from the asset folder (Vite)
    // @ts-ignore
    const modules = import.meta.glob('../../IA_asset/*.{jpg,jpeg,png}', { eager: true }) as Record<string, any>;
    const entries = Object.entries(modules).sort((a, b) => a[0].localeCompare(b[0]));
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

            // Recuperation de response dans data
            const formaResponse = new FormData();
            formaResponse.append("data", response.data?.aiOutPout);

            setDataScript((prev: any) => ({ ...prev, longText: formaResponse }));
            console.log("script :", dataScript);
            console.log(response.data?.aiOutpout);
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
            // setCheckHandleSending(() => false);
        }
    }
    console.log("data scripts :", dataScript);

    return (

        <div className="div-upload-script">
            {/* <form onSubmit={handleSubmit} className="form-upload-script">
                <label className="drop-zone">
                    <input type="file" accept=".pdf, .doc, .docx, .txt"
                        title="Ajouter un fichier" id="input-file" onChange={handleFileChange} />
                    {error && <span className="span-text-errors">{error}</span>}
                    <div className="drop-content">
                        <p><File /> Glisser le scénario ici</p>
                    </div>
                </label>
                <button type="submit" disabled={loading} aria-labelledby="input-file" className="btn-send-file">
                    {loading ? "Analyse en cours..." : "Envoyer le scénario"}</button>
            </form> */}
            <aside className="infos-upload">
                <div className="carousell-aside" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    {images.map((src, idx) => (
                        <div key={idx} className={"carousel-slide" + (idx === current ? ' active' : '')}>
                            <img src={src} alt={`Production cinématographique ${idx + 1}`} />
                        </div>
                    ))}
                    <div className="carousel-dots">
                        {images.map((_, idx) => (
                            <button key={idx} className={"dot" + (idx === current ? ' active' : '')} onClick={() => setCurrent(idx)} aria-label={`Voir image ${idx + 1}`} />
                        ))}
                    </div>
                    <div className="carousel-caption" aria-live="polite">{itemslist[current]?.description}</div>
                </div>
            </aside>
            <form onSubmit={handleSubmit} className="form-upload-script">
                <div className="boot-ai-img">
                    {/* <img src={AI_boot} alt="AI boot style image " /> */}
                    {/* <h2>Film: {projectId}</h2> */}
                </div>
                <label className="drop-zone">
                    <input type="file" accept=".pdf, .doc, .docx, .txt"
                        title="Ajouter un fichier" id="input-file" onChange={handleFileChange} />
                    {error && <span className="span-text-errors">{error}</span>}<br />
                    <div className="drop-content">
                        <p><File color="#000" /> Glisser le scénario ici et laisser votre assistant faire le travail</p>
                    </div>
                </label>
                <button type="submit" disabled={loading} aria-labelledby="input-file" className="btn-send-file">
                    {loading ? "Analyse en cours..." : "Envoyer le scénario"}</button>
            </form >

            <section className="upload-steps" aria-label="Étapes d'envoi et de dépouillement">
                {steps.map((s, i) => (
                    <div className="step" key={i}>
                        <div className="step-num">{i + 1}</div>
                        <div className="step-body">
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                        </div>
                    </div>
                ))}
            </section>
            {!checkHandlesending && !error ? <SaveScriptUpload aiOuput={dataScript} URL_version="depoullement"
                checkHandlesending={setCheckHandleSending}
                projectId={ID_Project}
            /> : ""}
        </div >

    )
}

export default ScriptUpload;