import "@mantine/core/styles.css";
import "../shared/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  rem,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
export const metadata = {
  title: "فاکتور رسمی",
  description: "official invoice App",
};

const theme = createTheme({
  fontFamily: "IRANSansWeb",
  primaryColor: "indigo",
  defaultRadius: "md",
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
        color: "indigo",
        size: "md",
        miw: rem(104),
        mah: rem(34),
        style: {
          boxShadow: "0px 1px 4px 0px rgba(12, 12, 13, 0.1)",
          fontWeight: 400,
          fontSize: 16,
        },
      },
    },
    Input: {
      defaultProps: {},
    },
    TextInput: {
      defaultProps: {
        styles: {
          label: {
            display: "flex",
            fontSize: 12,
            fontWeight: 500,
            marginRight: 2,
            marginBottom: 5,
          },
        },
      },
    },
    UnstyledButton: {
      defaultProps: {
        size: "md",
        style: {
          fontSize: 11,
          color: "#667085",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    Radio: {
      defaultProps: {
        size: "xs",
        color: "indigo",
      },
    },
    Menu: {
      defaultProps: {
        shadow: "md",
      },
    },
    Mark: {
      defaultProps: {
        color: "#D7E1F9",
        style: {
          borderRadius: 6,
          minWidth: rem(70),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          color: "#4C6EF5",
        },
      },
    },
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
        <MantineProvider theme={theme}>
          <Notifications position="top-center" autoClose={2000} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
