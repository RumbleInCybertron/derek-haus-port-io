import { useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next/types";
import Router, { useRouter } from "next/router";
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
  const router = useRouter();
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
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
      if(document.getElementById("spinner") != undefined) document.getElementById("spinner")!.style.display = "block";
      return;
    };

    const handleRouteChangeComplete = () => {
      if(document.getElementById("spinner") != undefined) document.getElementById("spinner")!.style.display = "none";
      return;
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    if (!session)
      Router.push('/')

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    };
  }, [router.events, session]);
  // console.log(session);
  // console.log(user);
  // console.log(user.id);

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