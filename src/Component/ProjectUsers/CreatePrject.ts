import axio from "../../config/axiosConfig";

const createProject = async (type_production: string,
    titre: string,
    description: string,
    status: string,
    setErrorMessage: any,
    setIsLoading: any) =>
{
    const dataProject: Object = { type_production, titre, description, status }
    try
    {
        const res = await axio.post('/api/projects/create',
            { dataProject }
        );
        console.log(res.data);
        setIsLoading(true);

        return res.data;
    } catch (err: any)
    {
        console.error(err?.response.data?.messages || err.message);
        setErrorMessage(err.response?.data?.message || 'Erreur lors de la création du projet. Veuillez réessayer.');

        throw err;
    } finally
    {
        setIsLoading(false);

    }
}

const contextProject = async (
    formatOfProject: Object,
    dataStep3: Object,
    dataStep4: Object,
    dataStep5: Object,
    dataStep6: Object,
    projectId: number) =>
{
    try
    {
        const res = await axio.post(`/api/context/${projectId}/questionnaire`,
            {
                formatOfProject,
                dataStep3,
                dataStep4,
                dataStep5,
                dataStep6,
            }
        );
        console.log(res.data);

        return res.data;
    } catch (err: any)
    {
        console.error(err.message);
        throw err;
    }

}

export { createProject, contextProject };