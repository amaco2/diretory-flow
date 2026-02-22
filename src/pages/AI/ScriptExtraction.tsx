import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Download, ArrowLeft, FileText, CheckCircle, AlertCircle, Eye, EyeOff, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./style/ScriptExtraction.css";

type RouteParams = {
    ID_Project: number;
};

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 40px 20px;
    background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
    color: white;
    font-size: 2.2em;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    animation: slideInLeft 0.6s ease-out;

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95em;

    &.primary {
        background: linear-gradient(135deg, #00d4ff, #0099ff);
        color: white;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
        }
    }

    &.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }
    }

    &.toggle {
        background: rgba(0, 212, 255, 0.1);
        color: #00d4ff;
        border: 1px solid rgba(0, 212, 255, 0.3);
        padding: 8px 12px;
        font-size: 0.85em;
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(0, 212, 255, 0.2);
            border-color: rgba(0, 212, 255, 0.6);
            transform: scale(1.05);
        }

        svg {
            transition: transform 0.3s ease;
        }
    }
`;

const TableContainer = styled.div`
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: transparent;

    thead {
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 153, 255, 0.2));
        color: #00d4ff;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    th {
        padding: 18px 15px;
        text-align: left;
        font-weight: 600;
        font-size: 0.95em;
        letter-spacing: 0.5px;
        border-bottom: 2px solid rgba(0, 212, 255, 0.3);
        text-transform: uppercase;
    }

    tbody tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease;

        &:hover {
            background-color: rgba(0, 212, 255, 0.1);
            box-shadow: inset 0 0 10px rgba(0, 212, 255, 0.05);
        }

        &:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.03);
        }
    }

    td {
        padding: 14px 15px;
        font-size: 0.9em;
        color: rgba(255, 255, 255, 0.8);
    }

    tbody tr:last-child {
        border-bottom: 2px solid rgba(0, 212, 255, 0.3);
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        color: rgba(255, 59, 48, 0.7);
    }

    p {
        font-size: 1.1em;
        margin: 15px 0;
        color: rgba(255, 255, 255, 0.7);
    }
`;

const DetailsRow = styled.tr<{ isExpanded: boolean }>`
    display: ${props => props.isExpanded ? 'table-row' : 'none'};
    background-color: rgba(0, 212, 255, 0.08) !important;

    td {
        padding: 20px 15px;
        font-size: 0.85em;
        color: rgba(255, 255, 255, 0.7);
        border-top: 1px solid rgba(0, 212, 255, 0.2);
    }
`;

const DetailContent = styled.div`
    padding: 0;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: "Courier New", monospace;
    background: rgba(0, 212, 255, 0.05);
    border-left: 4px solid #00d4ff;
    padding-left: 15px;
    color: rgba(255, 255, 255, 0.8);
    animation: slideInDetail 0.3s ease-out;

    @keyframes slideInDetail {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Animation fluide pour l'entrée de la section
const AnimatedTableContainer = styled(TableContainer)`
    animation: fadeInUp 0.5s ease-out;

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ScriptExtraction = () =>
{
    const location = useLocation();
    const navigate = useNavigate();
    const { ID_Project } = useOutletContext<RouteParams>();
    const contentRef = useRef<HTMLDivElement>(null);

    const [depouillement, setDepouillement] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    useEffect(() =>
    {
        const aiOutputJson = localStorage.getItem("aiOutput");

        if (aiOutputJson)
        {
            try
            {
                const parsed = JSON.parse(aiOutputJson);
                setDepouillement(parsed);
            } catch (error)
            {
                console.error("Erreur parsing JSON:", error);
                setDepouillement(null);
            }
        }
        setLoading(false);
    }, []);

    // Convertir une valeur (objet/array/primitive) en texte brut lisible
    const toPlainText = (value: any): string =>
    {
        if (value === null || value === undefined) return "-";
        if (typeof value === 'string') return value;
        if (typeof value === 'number' || typeof value === 'boolean') return String(value);
        if (Array.isArray(value)) return value.map(v => toPlainText(v)).join(' · ');
        if (typeof value === 'object')
        {
            return Object.entries(value).map(([k, v]) => `${k}: ${toPlainText(v)}`).join('\n');
        }
        return String(value);
    }

    // Formater les données et les grouper par phase (détecte clé "phase" ou "act" ou else "Général")
    const formatDataForTable = () =>
    {
        const groups: Record<string, Array<any>> = {};
        if (!depouillement) return [];

        const pushItem = (phase: string, item: any) =>
        {
            if (!groups[phase]) groups[phase] = [];
            groups[phase].push(item);
        }

        // Normaliser depouillement en tableau d'items simples
        const normalize = (raw: any): Array<any> =>
        {
            if (Array.isArray(raw))
            {
                return raw.map((it: any, idx: number) => ({
                    id: idx,
                    title: toPlainText(it),
                    raw: it
                }));
            }
            if (typeof raw === 'object')
            {
                return Object.entries(raw).map(([key, value]: any, idx: number) => ({
                    id: idx,
                    title: toPlainText(value),
                    key,
                    raw: value
                }));
            }
            return [{ id: 0, title: toPlainText(raw), raw }];
        }

        const normalized = normalize(depouillement);

        // Tenter de détecter une phase dans chaque item (clé 'phase' ou 'act' ou valeur contenant 'Phase')
        normalized.forEach((it: any, idx: number) =>
        {
            let phase = 'Général';
            if (it.raw && typeof it.raw === 'object')
            {
                if (it.raw.phase) phase = String(it.raw.phase);
                else if (it.raw.act) phase = String(it.raw.act);
                else if (it.key && /scene|phase|act/i.test(String(it.key))) phase = it.key;
                else if (it.title && /phase|act|scène|scene/i.test(it.title)) phase = 'Scènes';
            }
            pushItem(phase, {
                id: idx,
                nom: it.title || it.key || 'Elément',
                type: it.key || 'Élément',
                details: toPlainText(it.raw)
            });
        });

        // Transformer en tableau groupé ordonné (Général last)
        const ordered: Array<any> = [];
        Object.keys(groups).sort((a, b) => (a === 'Général' ? 1 : (b === 'Général' ? -1 : a.localeCompare(b)))).forEach(key =>
        {
            ordered.push({ phase: key, items: groups[key] });
        });

        return ordered;
    };

    const groupedData = formatDataForTable();

    const toggleRow = (phaseIndex: number, rowId: number) =>
    {
        const key = `${phaseIndex}-${rowId}`;
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(key)) newExpanded.delete(key); else newExpanded.add(key);
        setExpandedRows(newExpanded);
    };

    // Fonction pour exporter en PDF
    const handleExportPDF = async () =>
    {
        if (!contentRef.current) return;

        try
        {
            const element = contentRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            const pageWidth = 210; // mm
            const pageHeight = 297; // mm
            const headerHeight = 12; // mm
            const footerHeight = 12; // mm

            // Dimensions de l'image en mm pour la largeur de la page
            const imgWidth = pageWidth;
            const imgHeightPx = canvas.height;
            const imgWidthPx = canvas.width;
            const imgHeightMm = (imgHeightPx * imgWidth) / imgWidthPx;

            // On place l'image en commençant sous l'en-tête
            let positionY = 0; // position en mm pour addImage

            // Nombre approximatif de pages nécessaires
            const availableHeight = pageHeight; // we draw full image and then add header/footer per page
            let heightLeft = imgHeightMm;

            const projectTitle = ID_Project ? `Dépouillement - Projet ${ID_Project}` : `Dépouillement`;

            // Ajout de la première page et en-têtes/pieds de page
            let pageIndex = 1;
            pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeightMm);
            // Header
            pdf.setFontSize(10);
            pdf.setTextColor(0);
            pdf.text(projectTitle, 10, 8);
            // Footer (page number)
            pdf.setFontSize(9);
            pdf.text(`Page ${pageIndex}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

            heightLeft -= availableHeight;

            while (heightLeft > -availableHeight)
            {
                pageIndex += 1;
                pdf.addPage();
                // L'image est la même, mais on doit la dessiner avec un offset vertical négatif
                const offset = (pageIndex - 1) * availableHeight;
                pdf.addImage(imgData, "PNG", 0, -offset, imgWidth, imgHeightMm);
                // Header
                pdf.setFontSize(10);
                pdf.setTextColor(0);
                pdf.text(projectTitle, 10, 8);
                // Footer
                pdf.setFontSize(9);
                pdf.text(`Page ${pageIndex}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

                heightLeft -= availableHeight;
            }

            pdf.save(`depouillement-scenario-${new Date().getTime()}.pdf`);
        } catch (error)
        {
            console.error("Erreur lors de l'export PDF:", error);
            alert("Erreur lors de l'export PDF");
        }
    };

    const handleGoBack = () =>
    {
        navigate(-1);
    };

    if (loading)
    {
        return (
            <Container>
                <Header>
                    <Title>Chargement...</Title>
                </Header>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>
                    <FileText size={32} style={{ marginRight: '10px' }} />
                    Dépouillement du Scénario
                    <CheckCircle size={28} style={{ marginLeft: '10px', color: '#00ffeb' }} />
                </Title>
                <ButtonGroup>
                    <Button className="secondary" onClick={handleGoBack}>
                        <ArrowLeft size={18} />
                        Retour
                    </Button>
                    {groupedData.length > 0 && (
                        <Button className="primary" onClick={handleExportPDF}>
                            <Download size={18} />
                            Exporter en PDF
                        </Button>
                    )}
                </ButtonGroup>
            </Header>

            <div ref={contentRef} className="pdf-content">
                <TableContainer>
                    {groupedData.length > 0 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>#</th>
                                    <th style={{ width: '40%' }}>NOM / DESCRIPTION</th>
                                    <th style={{ width: '35%' }}>TYPE / CATÉGORIE</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>DÉTAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedData.map((phase: any, pIdx: number) => (
                                    <React.Fragment key={`phase-frag-${pIdx}`}>
                                        <tr key={`phase-${pIdx}`} style={{ background: '#111', color: '#fff' }}>
                                            <td colSpan={4} style={{ padding: '12px 18px', fontWeight: 700 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <ChevronDown size={18} />
                                                        <span style={{ fontSize: '1em' }}>{phase.phase}</span>
                                                    </div>
                                                    <div style={{ opacity: 0.75, fontSize: '0.9em' }}>{phase.items.length} tâches</div>
                                                </div>
                                            </td>
                                        </tr>
                                        {phase.items.map((row: any, idx: number) =>
                                        {
                                            const key = `${pIdx}-${idx}`;
                                            return (
                                                <React.Fragment key={`frag-${pIdx}-${idx}`}>
                                                    <tr key={`row-${pIdx}-${idx}`}>
                                                        <td style={{ fontWeight: 'bold', color: '#000' }}>{idx + 1}</td>
                                                        <td style={{ fontWeight: '500' }}>{row.nom}</td>
                                                        <td>{row.type}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {row.details && (
                                                                <Button
                                                                    className="toggle"
                                                                    onClick={() => toggleRow(pIdx, idx)}
                                                                >
                                                                    {expandedRows.has(key) ? (
                                                                        <>
                                                                            <EyeOff size={16} />
                                                                            Masquer
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Eye size={16} />
                                                                            Afficher
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {expandedRows.has(key) && row.details && (
                                                        <DetailsRow isExpanded={true} key={`details-${pIdx}-${idx}`}>
                                                            <td colSpan={4}>
                                                                <DetailContent>
                                                                    {row.details}
                                                                </DetailContent>
                                                            </td>
                                                        </DetailsRow>
                                                    )}
                                                </React.Fragment>
                                            )
                                        })}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <EmptyState>
                            <AlertCircle size={48} style={{ margin: '0 auto 20px', color: '#ff6b6b' }} />
                            <p>❌ Aucun dépouillement disponible</p>
                            <p>Veuillez analyser un scénario d'abord.</p>
                        </EmptyState>
                    )}
                </TableContainer>
            </div>
        </Container>
    );
};

export default ScriptExtraction;
