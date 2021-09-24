import Link from "next/link"
import { Component } from 'react';
import SidebarItem, { SidebarItemProps } from '../components/sidebar-item';
import { Box, FolderPlus, Icon, Person, PersonBadge, Camera2, PersonBoundingBox, People, Camera } from 'react-bootstrap-icons';

interface SidebarProps {
    name: string
}

interface SidebarState {
    currentMenuItem: string
}

class Sidebar extends Component {
    constructor(props: SidebarProps) {
        super(props);
        this.state = { currentMenuItem: props.name };
    }

    getMenuItem(name: string, selectedItemName: string, icon: Icon, link: string, iconColor: string = '#000000'): SidebarItemProps {
        return {
            name: name,
            selectedItemName: selectedItemName,
            icon: icon,
            link: link,
            iconColor: iconColor,
        }
    }

    render() {
        const currState = this.state as SidebarState;
        const collections = this.getMenuItem("Collections", currState.currentMenuItem, Box, '/collections');
        const registerNewUser = this.getMenuItem("Register new user", currState.currentMenuItem, PersonBoundingBox, '/register-new-user');
        const registerNewUserWithIdCard = this.getMenuItem("Register new user with ID card", currState.currentMenuItem, PersonBadge, '/register-new-user-with-idcard');
        const updateUserPhoto = this.getMenuItem("Update user photo", currState.currentMenuItem, Camera2, '/update-user-photo');
        const loginUser = this.getMenuItem("Login user", currState.currentMenuItem, Camera, '/login-user');
        const browseUsers = this.getMenuItem("Browse users", currState.currentMenuItem, People, '/browse-users');

        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <SidebarItem {...collections} />
                        <SidebarItem {...registerNewUser} />
                        <SidebarItem {...registerNewUserWithIdCard} />
                        <SidebarItem {...updateUserPhoto} />
                        <SidebarItem {...loginUser} />
                        <SidebarItem {...browseUsers} />
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;