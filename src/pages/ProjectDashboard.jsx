import { Outlet } from "react-router-dom";
import ProjectLayout from "../layout/ProjectLayout";

function ProjectDashboar()
{

    return (
        <ProjectLayout>
            <Outlet />
        </ProjectLayout>
    )
}

export default ProjectDashboar;