// styles
import "./globals.scss";
import "antd/dist/reset.css";

// react-query
import QueryClientContext from "@/components/common/constants/QueryClient";

// fonts
import { Inter } from "next/font/google";
import StoreProvider from "@/components/common/constants/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rebound Security",
  description: "Rebound Security",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryClientContext>
            {children}
          </QueryClientContext>
        </StoreProvider>
      </body>
    </html>
  );
}
