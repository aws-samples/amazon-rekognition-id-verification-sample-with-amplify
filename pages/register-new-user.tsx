import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import RegisterNewUser from "../components/register-new-user";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { PageProps } from "../common/common-types";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Register new user' };

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

export default function RegNewUserPage(props: PageProps) {

  const layoutProps = {username: props.username, title: props.pageHeading, children: RegisterNewUser(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}