// import Home from '@/src/components/home';
// import withSidebar from '@/src/hoc/with-sidebar';
// import withStore from '@/src/hoc/with-store';
// import withAuth from '@/src/hoc/with-auth';

// const HomePageWithSidebar = withSidebar(Home, { page: 'home' });
// const HomePageWithAuth = withAuth(HomePageWithSidebar);
// const HomePageWithStore = withStore(HomePageWithAuth);

// export default HomePageWithStore;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/boards',
      permanent: false // Indicates if the redirect is permanent (301) or temporary (307)
    }
  };
}

export default function Page() {
  return <div>Redirecting...</div>;
}
