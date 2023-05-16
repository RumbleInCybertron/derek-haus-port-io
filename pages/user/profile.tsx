import { useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next/types";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { UserProps } from "@/components/User";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: String(query.email)
    },
  });

  // const user = JSON.stringify(res)

  // if (!user) user = await prisma.user.create({
  //   data: { 
  //     name: String(query?.name), 
  //     email: String(query?.email) 
  //   },
  // })

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  }
};

type Props = {
  user: UserProps,
};

const Profile = ({ user }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { data: session, status } = useSession();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, email };
      await fetch('', { // TODO: add route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/profile/patch');
    } catch (err) {
      console.error(err);
    }
    try {
      const data = await fetch('/user/', {})
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const redirect = async () => {
      if (!session)
        await Router.push('/')
    }

    redirect()
      .catch(console.error);
  }, [session]);
  // console.log(session);
  // console.log(user);
  // console.log(user.id);

  if (!session) return null;
  return (
    <Layout>
      <div>
        <h1>Profile</h1>
        {user.name}{user.email}
      </div>
    </Layout>
  );
}

export default Profile;