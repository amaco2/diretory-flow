import { Stack, NavLink } from "@mantine/core";
import
{
    IconLayoutDashboard,
    IconColumns,
    IconCalendar,
    IconUsers,
    IconFolder,
    IconRobot,
    IconMessage,
    IconQuestionMark
} from "@tabler/icons-react";
import { NavLink as RouterLink } from "react-router-dom";

function Sidebar()
{

    return (
        <Stack style={ { color: '#fff' } }>
            <NavLink
                component={ RouterLink }
                to="overview"
                label="overview"
                leftSection={ <IconLayoutDashboard /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="./step2"
                label="questionnaire"
                leftSection={ <IconQuestionMark /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="./kanban"
                label="kanban"
                leftSection={ <IconColumns /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="timeline"
                label="Planning"
                leftSection={ <IconCalendar /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="team"
                label="Equipe"
                leftSection={ <IconUsers /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="documents"
                label="Documents"
                leftSection={ <IconFolder /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="ai"
                label="Assistant IA"
                leftSection={ <IconRobot /> }
                __size={ 20 }
            />
            <NavLink
                component={ RouterLink }
                to="chat"
                label="Chat"
                leftSection={ <IconMessage /> }
                __size={ 20 }
            />
        </Stack >
    )
}

export default Sidebar;