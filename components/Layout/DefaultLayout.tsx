import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import React, { useCallback } from "react";
import { Auth } from 'aws-amplify';
import Head from "next/head";
import Link from "next/link"
import Sidebar from "../../components/sidebar"
import PageHeading from "../../components/pageheadingcomponent";

export interface DefaultLayoutProps {
  username: string,
  title: string,
  children?: React.ReactNode,
}

export default function DefaultLayout(props: DefaultLayoutProps) {

  const sidebarPropsVal = {
    name: props.title
  };

  const signOut = async() => {
    await Auth.signOut();
    window.location.assign('/');
  };

  return (

    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Wait..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow navbar-style">
        <Link href="/">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Rekognition IdV</a>
        </Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a
              href="#"
              onClick={signOut}
              className="nav-link px-3">
              Sign out
            </a>
          </div>
        </div>
      </div>

      <AmplifyAuthenticator>
        <div className="container-fluid">
          <div className="row">
            <Sidebar {...sidebarPropsVal} />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <PageHeading pageHeading={props.title} username={props.username} />

              {props.children}
            </main>
          </div>
        </div>
      </AmplifyAuthenticator>

    </div>
  )
}