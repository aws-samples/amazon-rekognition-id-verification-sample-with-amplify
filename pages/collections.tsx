import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import Collections from "../components/collections";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { PageProps } from "../common/common-types";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Collections' };

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

export default function CollectionsPage(props: PageProps) {

  const layoutProps = {username: props.username, title: props.pageHeading, children: Collections(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}