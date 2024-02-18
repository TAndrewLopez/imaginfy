import { UserButton } from "@clerk/nextjs";

interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = ({ }) => {
  return (
    <div>
      <p>Home Page</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
