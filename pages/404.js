export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
}

export const getServerSideProps = () => {
    return {
      redirect: {
        destination: '/',
      },
    };
  };