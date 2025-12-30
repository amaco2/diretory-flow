import { AppShell } from "@mantine/core";
import Sidebar from "../Component/Sidebar";
import Topbar from "../Component/TopBar";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import "./style/style.css"

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
            bg={ "#ffffffff" }
            className="bg-img-layout-main"
        >
            <AppShell.Navbar bg={ '#40A1C4' } color="#fff" __size="30">
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Header bg={ "#40A1C4" } color="#fff">
                <Topbar
                    toogleSidebar={ setOpened }
                    opened={ opened } />
            </AppShell.Header>

            <AppShell.Main >
                { children }
            </AppShell.Main>

        </AppShell>
    )
}

export default ProjectLayout;