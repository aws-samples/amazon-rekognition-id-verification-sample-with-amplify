import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import React, { MouseEvent, useState, SetStateAction, Dispatch, useEffect } from "react";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import Link from "next/link"
import Sidebar from "../components/sidebar"
import PageHeading from "../components/pageheadingcomponent";
import DashboardComponent from "../components/dashboard";
import UserDetails from "../components/user-details";
import UploadImages from "../components/upload-images"
import BrowseImages from "../components/browse-images";
import Collections from "../components/collections";
import RegisterNewUser from "../components/register-new-user";
import LoginUser from "../components/login-user";
import BrowseUsers from "../components/browse-users";

Amplify.configure({ ...awsExports, ssr: true });

interface MyProps {
  username: string
}

interface DashboardState {
  currentMenuItem: string,
  username: string
}

function handleLinkClick(linkName: string, state: DashboardState, setState: Dispatch<SetStateAction<DashboardState>>) {
  setState({ currentMenuItem: linkName, username: state.username });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: MyProps = { username: '' };

  try {
    const user = await SSR.Auth.currentAuthenticatedUser();
    if (user && user.username) {
      myProps.username = user.username;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: myProps
  };
}

function GetMainContent(myState: DashboardState) {

  const dashProps = { pageHeading: myState.currentMenuItem, username: myState.username }

  switch (myState.currentMenuItem) {
    case "User details":
      return <UserDetails {...dashProps} />;
    case "Upload images":
      return <UploadImages {...dashProps} />;
    case "Browse images":
      return <BrowseImages {...dashProps} />;
    case "Collections":
      return <Collections {...dashProps} />;
    case "Register new user":
      return <RegisterNewUser {...dashProps} />;
    case "Login user":
      return <LoginUser {...dashProps} />;
    case "Browse users":
      return <BrowseUsers {...dashProps} />;
    default:
      return <DashboardComponent />;
  }
}

export default function Index(props: MyProps) {

  const [dashProps, setDashProps] = useState({ currentMenuItem: 'Dashboard', username: 'karthit' });

  const sidebarPropsVal = {
    name: 'testSidebar',
    callFunc: (linkName: string) => handleLinkClick(linkName, dashProps, setDashProps)
  };

  return (

    <div>
      <Head>
        <title>Dashboard app</title>
        <meta name="description" content="Wait..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link href="/">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Rekognition IdV</a>
        </Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Image search" aria-label="Image search"></input>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link href="#">
              <a className="nav-link px-3">Sign out</a>
            </Link>
          </div>
        </div>
      </div>

      <AmplifyAuthenticator>
        <div className="container-fluid">
          <div className="row">
            <Sidebar {...sidebarPropsVal} />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <PageHeading pageHeading={dashProps.currentMenuItem} username={dashProps.username} />

              <GetMainContent {...dashProps} />
            </main>
          </div>
        </div>
      </AmplifyAuthenticator>

    </div>
  )
}