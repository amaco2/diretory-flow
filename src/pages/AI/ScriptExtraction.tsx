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
    background: #f5f5f5;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 25px;
    background: #000;
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
    color: white;
    font-size: 2em;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: center;
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
    gap: 15px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95em;
    position: relative;
    overflow: hidden;

    &.primary {
        background: white;
        color: #000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        &:active {
            transform: translateY(0);
        }
    }

    &.secondary {
        background: transparent;
        color: white;
        border: 2px solid white;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
    }

    &.toggle {
        background: transparent;
        color: #000;
        border: 1px solid #000;
        padding: 8px 12px;
        font-size: 0.85em;
        border-radius: 3px;
        transition: all 0.2s ease;

        &:hover {
            background: #000;
            color: white;
            transform: scale(1.05);
        }

        svg {
            transition: transform 0.3s ease;
        }

        &:active svg {
            transform: rotate(180deg);
        }
    }
`;

const TableContainer = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 30px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: white;

    thead {
        background: #1a1a1a;
        color: white;
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
        border-bottom: 3px solid #000;
        text-transform: uppercase;
    }

    tbody tr {
        border-bottom: 1px solid #e0e0e0;
        transition: all 0.2s ease;

        &:hover {
            background-color: #f9f9f9;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
        }

        &:nth-child(even) {
            background-color: #fafafa;
        }
    }

    td {
        padding: 14px 15px;
        font-size: 0.9em;
        color: #333;
    }

    tbody tr:last-child {
        border-bottom: 3px solid #000;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 40px;
    color: #999;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 1.1em;
        margin: 10px 0;
    }
`;

const DetailsRow = styled.tr<{ isExpanded: boolean }>`
    display: ${props => props.isExpanded ? 'table-row' : 'none'};
    background-color: #f5f5f5 !important;

    td {
        padding: 20px 15px;
        font-size: 0.85em;
        color: #666;
        border-top: 1px solid #ddd;
    }
`;

const DetailContent = styled.div`
    padding: 0;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: "Courier New", monospace;
    background: #fff;
    border-left: 4px solid #000;
    padding-left: 15px;
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
