import { AppShell } from "@mantine/core";
import Sidebar from "../Component/Sidebar";
import Topbar from "../Component/TopBar";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

function ProjectLayout( { children } )
{

    const [ opened, setOpened ] = useState( true );

    return (
        <AppShell
            navbar={ {
                width: 260, breakpoint: "sm", collapsed: {
                    desktop: !opened,
                    mobile: !opened
                }
            } }
            header={ { height: 65 } }
            padding={ "md" }
        >
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Header>
                <Topbar
                    toogleSidebar={ setOpened }
                    opened={ opened } />
            </AppShell.Header>

            <AppShell.Main>
                { children }
            </AppShell.Main>

        </AppShell>
    )
}

export default ProjectLayout;