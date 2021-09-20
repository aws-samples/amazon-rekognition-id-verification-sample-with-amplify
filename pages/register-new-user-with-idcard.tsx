import { Amplify, withSSRContext } from "aws-amplify";
import React, {  } from "react";
import awsExports from "../src/aws-exports";
import { GetServerSideProps } from 'next'
import DefaultLayout from "../components/Layout/DefaultLayout";
import { PageProps } from "../common/common-types";
import RegisterNewUserWithIdCard from "../components/register-new-user-with-idcard";

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SSR = withSSRContext(context);

  var myProps: PageProps = { username: '', pageHeading: 'Register new user with ID card' };

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

export default function RegNewUserWithIdCardPage(props: PageProps) {

  const layoutProps = {username: props.username, title: props.pageHeading, children: RegisterNewUserWithIdCard(props)};

  return (
    <DefaultLayout {...layoutProps} />
  )
}