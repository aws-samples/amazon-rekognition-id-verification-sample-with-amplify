import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import BrowseUsers from "../components/browse-users";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { PageProps } from "../common/common-types";

Amplify.configure({ ...awsExports, ssr: true });

export const getStaticProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Browse users' };

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

export default function BrowseUsersPage(props: PageProps) {

  const layoutProps = {username: props.username, title: props.pageHeading, children: BrowseUsers(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}