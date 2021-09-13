import Link from "next/link"
import { Component } from 'react';
import SidebarItem, { SidebarItemProps } from '../components/sidebar-item';
import { Box, FolderPlus, Icon, Person, PersonBadge, Grid, EmojiSmileFill, People, Camera } from 'react-bootstrap-icons';

interface SidebarProps {
    callFunc: (param: string) => void,
    name: string
}

interface AllSideItems {
    dashboard: SidebarItemProps,
    uploadImages: SidebarItemProps,
}

interface SidebarState {
    currentMenuItem: string
}

class Sidebar extends Component {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {currentMenuItem: 'Dashboard'};
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(linkName: string) {
        this.setState({currentMenuItem: linkName});

        const myProps = this.props as SidebarProps;

        myProps.callFunc(linkName);
    }

    getMenuItem(name: string, selectedItemName: string, icon: Icon, iconColor: string = '#000000'): SidebarItemProps {
        return {
            name: name,
            callFunc: this.handleLinkClick,
            selectedItemName: selectedItemName,
            icon: icon,
            iconColor: iconColor,
        }
    }

    render() {
        const currState = this.state as SidebarState;
        const userDetails = this.getMenuItem("User details", currState.currentMenuItem, Person);
        const uploadImagesItem = this.getMenuItem("Upload images", currState.currentMenuItem, FolderPlus);
        const browseImages = this.getMenuItem("Browse images", currState.currentMenuItem, Grid);
        const collections = this.getMenuItem("Collections", currState.currentMenuItem, Box);
        const registerNewUser = this.getMenuItem("Register new user", currState.currentMenuItem, PersonBadge);
        const loginUser = this.getMenuItem("Login user", currState.currentMenuItem, Camera);
        const browseUsers = this.getMenuItem("Browse users", currState.currentMenuItem, People);

        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={() => this.handleLinkClick('Dashboard')} style={{cursor: "pointer"}}>
                                <span data-feather="home"></span>
                                Dashboard
                            </a>
                        </li>
                        <SidebarItem {...userDetails}/>
                        <SidebarItem {...uploadImagesItem}/>
                        <SidebarItem {...browseImages}/>
                        <SidebarItem {...collections}/>
                        <SidebarItem {...registerNewUser}/>
                        <SidebarItem {...loginUser}/>
                        <SidebarItem {...browseUsers}/>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="bar-chart-2"></span>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="layers"></span>
                                Integrations
                            </a>
                        </li>
                    </ul>
    
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Saved reports</span>
                        <a className="link-secondary" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Current month
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Last quarter
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Social engagement
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Year-end sale
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;