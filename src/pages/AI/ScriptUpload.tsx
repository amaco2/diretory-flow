import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import axio from "../../config/axiosConfig";
import './style/style.css'
import { File } from "lucide-react";


type RouteParams = {
    ID_Project: Array<string>;
};


function ScriptUpload()
{
    const { ID_Project } = useOutletContext<RouteParams>();

    const [file, setFile] = useState<File | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Dynamically import all images from the asset folder (Vite)
    // @ts-ignore
    const modules = import.meta.glob('../../asset/*.{jpg,jpeg,png}', { eager: true }) as Record<string, any>;
    const entries = Object.entries(modules).sort((a, b) => a[0].localeCompare(b[0])).slice(0, 7);
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


        try
        {
            const formaData = new FormData();
            formaData.append("script", file);

            setLoading(true);
            console.log(ID_Project[1]);
            const response: any = await axio.post(`/api/depouillement/projects/${ID_Project[1]}/analyse`,
                formaData,
                { withCredentials: true },
            );
            console.log(response.data?.aiOutpout);
            alert('Scénario envoyé avec succè');
        } catch (err: any)
        {
            setError(
                err.response?.data?.message || err.message || "Erreur inconue"
            );
        } finally
        {
            setLoading(false)
        }
    }

    return (

        <div className="div-upload-script">
            <form onSubmit={handleSubmit} className="form-upload-script">
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
            </form>
            <aside className="infos-upload">
                <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
                    <div className="carousel-caption" aria-live="polite">{captions[current]}</div>
                </div>
            </aside>
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
        </div>

    )
}

export default ScriptUpload;