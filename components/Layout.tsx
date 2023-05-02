import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>

      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};