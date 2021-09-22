import { Amplify, withSSRContext } from "aws-amplify";
import React, { useState, SetStateAction, Dispatch } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import DefaultLayout from "../components/Layout/DefaultLayout";
import Dashboard from "../components/dashboard";
import { PageProps } from "../common/common-types";

Amplify.configure({ ...awsExports, ssr: true });

interface DashboardState {
  currentMenuItem: string,
  username: string
}

function handleLinkClick(linkName: string, state: DashboardState, setState: Dispatch<SetStateAction<DashboardState>>) {
  setState({ currentMenuItem: linkName, username: state.username });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Rekognition Id Verification Demo' };

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

export default function Index(props: PageProps) {

  const [dashProps, setDashProps] = useState({ currentMenuItem: 'Home', username: props.username });

  const layoutProps = {username: dashProps.username, title: 'Home', children: Dashboard(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}