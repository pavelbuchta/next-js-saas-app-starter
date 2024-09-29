import { Appearance } from "@stripe/stripe-js";

export const colors = {
  success: "#4d90b2",
  warning: "#f4ac4f",
  error: "#ff876f",

  background: "#000000",
  backgroundSecondary: "#141515",
  foreground: "#ffffff",
  foregroundSecondary: "#cccccc",
  foregroundTertiary: "#808080",

  border: "#ffffff20",
};

export const appearance = {
  theme: "flat",
  variables: {
    fontFamily: '"Inter", "Gill Sans", sans-serif',

    borderRadius: "0.5rem",
    focusOutline: "none",
    focusBoxShadow: "none",

    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorDanger: colors.error,
    colorBackground: colors.background,
    colorPrimary: colors.foreground,
    colorText: colors.foreground,
    colorTextSecondary: colors.foregroundSecondary,
    colorTextPlaceholder: colors.foregroundTertiary,
    tabIconColor: colors.foreground,
    tabIconSelectedColor: colors.foreground,
  },
  rules: {
    ".Input": {
      width: "100%",
      padding: "12px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.background,
      fontSize: "14px",
      outline: "none",
    },
    ".Input:focus": {
      backgroundColor: colors.backgroundSecondary,
    },
    ".Input::placeholder": {
      fontSize: "14px",
      color: colors.foregroundTertiary,
    },
    ".Label": {
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
    },
    ".Input:disabled, .Input--invalid:disabled": {
      cursor: "not-allowed",
    },
    // ".Block": {
    //   backgroundColor: "#000000",
    //   boxShadow: "none",
    //   padding: "12px",
    // },
    ".Tab": {
      padding: "10px 12px 8px 12px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.background,
    },
    ".Tab:hover": {
      backgroundColor: colors.backgroundSecondary,
    },
    ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.backgroundSecondary,
      color: colors.foreground,
    },
  },
} satisfies Appearance;
