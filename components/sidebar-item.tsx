import Link from 'next/link';
import React, { Component } from 'react';
import { Icon } from 'react-bootstrap-icons'

export interface SidebarItemProps {
    name: string,
    selectedItemName: string,
    icon: Icon,
    iconColor: string,
    link: string,
}

class SidebarItem extends Component {
    constructor(props: SidebarItemProps) {
        super(props);
    }

    render() {
        const myProps = this.props as SidebarItemProps;

        return (
            <li className="nav-item">
                <Link href={myProps.link}>
                    <a className={`nav-link ${myProps.selectedItemName == myProps.name ? "active" : ""}`}>
                        <myProps.icon className={`${myProps.selectedItemName == myProps.name ? "text-primary" : ""}`} style={{ marginBottom: 3, marginRight: 3, color: myProps.iconColor }} />
                        <span className={`ml-5 ${myProps.selectedItemName == myProps.name ? "text-primary" : ""}`}>
                            {myProps.name}
                        </span>
                    </a>
                </Link>
            </li>
        )
    }
}

export default SidebarItem;