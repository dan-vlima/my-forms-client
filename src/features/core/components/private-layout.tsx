import Column from "./column";
import Footer from "./footer";
import Header from "./header";

type PrivateLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function PrivateLayout({
  children,
  title = "My Forms",
}: PrivateLayoutProps) {
  return (
    <>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </head>
      <Column className="h-screen">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </Column>
    </>
  );
}
