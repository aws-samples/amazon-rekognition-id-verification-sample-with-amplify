import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import LoginUser from "../components/login-user";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { PageProps } from "../common/common-types";

Amplify.configure({ ...awsExports, ssr: true });

export const getStaticProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Login user' };

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

export default function LoginUserPage(props: PageProps) {

  const layoutProps = {username: props.username, title: props.pageHeading, children: LoginUser(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}