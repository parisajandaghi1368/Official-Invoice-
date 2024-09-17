import "@mantine/core/styles.css";
import "../shared/globals.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

export const metadata = {
  title: "فاکتور رسمی",
  description: "I have followed setup instructions carefully",
};

const theme = createTheme({
  fontFamily: "IRANSansWeb",

  primaryColor: "indigo",

  components: {
    Modal: {
      defaultProps: {
        centered: true,
        withCloseButton: false,
      },
      styles: { boxShadow: "0px 1px 4px 0px rgba(12, 12, 13, 0.1)" },
    },
    ActionIcon: {
      defaultProps: {
        size: "lg",
        variant: "light",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
        color: "indigo",
        size: "md",
        style: {
          boxShadow: "0px 1px 4px 0px rgba(12, 12, 13, 0.1)",
          fontWeight: 400,
        },
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      defaultProps: {
     
        styles: {
          width:'22rem',
          label: {
            display: "flex",
            fontSize: 11,
            marginRight: 2,
            marginBottom: 5,
          },
        },
      },
    },
    UnstyledButton:{
      defaultProps:{
        size:'md',
        style:{
          fontSize:11,
          color:'#667085'
        }
      }
    }
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
