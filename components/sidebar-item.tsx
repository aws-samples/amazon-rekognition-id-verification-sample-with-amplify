import { Component } from 'react';
import {Icon } from 'react-bootstrap-icons'

export interface SidebarItemProps {
    name: string,
    callFunc: (param: string) => void,
    selectedItemName: string,
    icon: Icon,
    iconColor: string,
}

class SidebarItem extends Component {
    constructor(props: SidebarItemProps) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(linkName: string) {
        const myProps = this.props as SidebarItemProps;

        myProps.callFunc(linkName);
    }

    render() {
        const myProps = this.props as SidebarItemProps;

        return (
            <li className="nav-item">
                <a className="nav-link" onClick={() => this.handleLinkClick(myProps.name)} style={{ cursor: "pointer" }}>
                    <myProps.icon className={`${myProps.selectedItemName == myProps.name ? "text-primary" : ""}`} style={{marginBottom: 3, marginRight: 3, color: myProps.iconColor}} />
                    <span className={`ml-5 ${myProps.selectedItemName == myProps.name ? "text-primary" : ""}`}>
                              {myProps.name}
                    </span>
                </a>
            </li>
        )
    }
}

export default SidebarItem;