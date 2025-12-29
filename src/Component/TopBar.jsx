import { Group, Text, Avatar, Burger } from "@mantine/core";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TContext } from "../ThemeContext";
import { getInitials, stringToColor } from "./ProjectUsers/style/styleComponent";
import { useContext } from "react";

function Topbar( { toogleSidebar, opened } )
{

    const { iconeUser, setIconeUser } = useContext( TContext );
    const intialUser = getInitials( iconeUser );
    const bgColor = stringToColor( iconeUser );
    return (
        <Group justify="space-between" px="md" bg={ " #252c44ff0" }>
            {/* <Group> */ }
            <Burger
                opened={ opened }
                onClick={ () =>
                {
                    toogleSidebar( o => !o )
                } }
                hiddenFrom="mm"
                size={ "sm" }
                bg={ "#fff" }
            />
            <Text fw={ 600 } style={ { marginTop: '20px', fontSize: '1.2em', color: "#fff" } }>DirectoryFlow</Text>
            <Avatar radius={ "xl" } bg={ bgColor } color="#fff" fz={ 20 }>{ intialUser }</Avatar>
            <Link to={ "/" } style={ { marginTop: '20px' } }><HomeIcon color="#fff" /></Link>
            {/* </Group> */ }
        </Group>
    );
};

export default Topbar;