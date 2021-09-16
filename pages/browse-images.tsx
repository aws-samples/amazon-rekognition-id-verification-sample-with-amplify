import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import BrowseImages from "../components/browse-images";
import DefaultLayout from "../components/Layout/DefaultLayout";

Amplify.configure({ ...awsExports, ssr: true });

interface RegNewUserProps {
  username: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: RegNewUserProps = { username: '' };

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

export default function BrowseImagesPage(props: RegNewUserProps) {

  const dashPropsIn = { pageHeading: 'Browse images', username: props.username }
  const layoutProps = {username: props.username, title: dashPropsIn.pageHeading, children: BrowseImages(dashPropsIn)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}